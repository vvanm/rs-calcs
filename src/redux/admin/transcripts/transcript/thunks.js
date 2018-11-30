import request from "api";
import moment from "moment";
import { push } from "connected-react-router";

import { toHHMMSS } from "functions";

function createTranscript(values) {
  return dispatch => {
    request({
      url: "/transcripts",
      method: "POST",
      data: {
        ...values,
        publishDate: values.publishDate.valueOf(),
        fragments: values.fragments.map(fragment => {
          const s = fragment.timestamp.split(":");
          return {
            ...fragment,
            timestamp: parseInt(s[0], 10) * 60 + parseInt(s[1], 10)
          };
        })
      }
    }).then(({ status, data }) => {
      if (status === 200) {
        dispatch(push("/admin/transcripts"));
      }
    });
  };
}

function loadTranscript(_id, setValues) {
  return dispatch => {
    request({
      url: `/transcripts/${_id}`
    }).then(({ status, data }) => {
      if (status === 200) {
        setValues({
          ...data,
          newFragment: {},
          publishDate: moment(data.publishDate),
          fragments: data.fragments.map(fragment => ({
            ...fragment,
            timestamp: toHHMMSS(fragment.timestamp)
          }))
        });
      } else {
      }
    });
  };
}

function updateTranscript(_id, values, actions) {
  return dispatch => {
    request({
      url: "transcripts/" + _id,
      method: "PATCH",
      data: {
        title: values.title,
        type: values.type,
        publishDate: values.publishDate.valueOf(),
        twitchVOD: values.twitchVOD,
        patchNotesLink: values.patchNotesLink,
        mods: values.mods,
        keywords: values.keywords,
        fragments: values.fragments.map(fragment => {
          const s = fragment.timestamp.split(":");
          return {
            ...fragment,
            timestamp: parseInt(s[0], 10) * 60 + parseInt(s[1], 10)
          };
        })
      }
    }).then(({ status, data }) => {
      actions.setSubmitting(false);
      if (status === 200) {
        actions.setStatus({ updateMsg: "update ok" });
      }
    });
  };
}

export { createTranscript, loadTranscript, updateTranscript };
