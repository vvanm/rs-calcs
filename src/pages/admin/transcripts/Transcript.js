import React, { Component } from "react";
import { connect } from "react-redux";
import { withFormik, FieldArray } from "formik";
import moment from "moment";

import { Row, Col, Form, Card, Collapse, Button } from "components";

import { thunks } from "redux/admin/transcripts/transcript";

import Fragment from "./transcript/Fragment";

const optionsMods = [
  {
    value: "archie",
    label: "Archie"
  },
  { value: "ash", label: "Ash" },
  { value: "ayiza", label: "Ayiza" },
  { value: "bruno", label: "Bruno" },
  { value: "curse", label: "Curse" },
  { value: "ed", label: "Ed" },
  { value: "gambit", label: "Gambit" },
  { value: "gee", label: "Gee" },
  { value: "ghost", label: "Ghost" },
  { value: "kieren", label: "Kieren" },
  { value: "lenny", label: "Lenny" },
  { value: "lottie", label: "Lottie" },
  { value: "mat_k", label: "Mat K" },
  { value: "maz", label: "Maz" },
  { value: "munro", label: "Munro" },
  { value: "nasty", label: "Nasty" },
  { value: "roq", label: "Roq" },
  { value: "ry", label: "Ry" },
  { value: "stone", label: "Stone" },
  { value: "sween", label: "Sween" },
  { value: "weath", label: "Weath" },
  { value: "west", label: "West" },
  { value: "wolf", label: "Wolf" }
];
const optionsTypes = [{ value: "patch-notes", label: "Patch notes" }, { value: "qa", label: "Q&A" }];

class Transcript extends Component {
  componentDidMount = () => {
    if (this.props._id !== "new") {
      this.props.loadTranscript(this.props.setValues);
    }
  };
  render() {
    const { status, isSubmitting, handleSubmit, handleChange, values, setFieldValue, _id } = this.props;

    return (
      <Card title={_id !== "new" ? values.title : "Create new transcript"}>
        <Form onSubmit={handleSubmit}>
          <FieldArray
            name="fragments"
            render={arrayHelpers => (
              <>
                <Row>
                  <Col span={12}>
                    <Button loading={isSubmitting} htmlType="submit">
                      {_id !== "new" ? "Update transcript " : "Create transcript"}
                    </Button>
                    {status !== undefined && status.updateMsg}
                    <Form.Block noLayout label="Title">
                      <Form.Input name="title" onChange={handleChange} value={values.title} />
                    </Form.Block>

                    <Row>
                      <Col span={6}>
                        <Form.Block noLayout label="Publish date">
                          <Form.DatePicker onChange={moment => setFieldValue("publishDate", moment)} value={values.publishDate} name="publishDate" style={{ width: "100%" }} />
                        </Form.Block>
                      </Col>
                      <Col span={4}>
                        <Form.Block noLayout label="Type">
                          <Form.Select onChange={({ value }) => setFieldValue("type", value)} value={values.type} options={optionsTypes} />
                        </Form.Block>
                      </Col>
                      {values.type === "qa" && (
                        <Col span={14}>
                          <Form.Block noLayout label="Twitch VOD">
                            <Form.Input name="twitchVOD" value={values.twitchVOD} onChange={handleChange} />
                          </Form.Block>
                        </Col>
                      )}
                      {values.type === "patch-notes" && (
                        <Col span={14}>
                          <Form.Block noLayout label="Patch notes link">
                            <Form.Input name="patchNotesLink" value={values.patchNotesLink} onChange={handleChange} />
                          </Form.Block>
                        </Col>
                      )}
                    </Row>

                    {values.type === "qa" && (
                      <Form.Block noLayout label="Mods">
                        <Form.Select onChange={({ value }) => setFieldValue("mods", value)} mode="multiple" value={values.mods} options={optionsMods} />
                      </Form.Block>
                    )}

                    <h3>Add fragment</h3>
                    <Fragment arrayHelpers={arrayHelpers} values={values.newFragment} logType={values.type} update={setFieldValue} />
                  </Col>
                  <Col span={12}>
                    {values.fragments.length > 0 && (
                      <Collapse accordion>
                        {values.fragments.map((fragment, i) => (
                          <Collapse.Panel key={i} header={`${fragment.title} - ${fragment.timestamp}`}>
                            <Fragment update={setFieldValue} index={i} logType={values.type} values={fragment} />
                          </Collapse.Panel>
                        ))}
                      </Collapse>
                    )}
                  </Col>
                </Row>
              </>
            )}
          />
        </Form>
      </Card>
    );
  }
}

const TranscriptWithFormik = withFormik({
  mapPropsToValues: () => ({
    title: "",
    type: "qa",
    publishDate: moment(),
    twitchVOD: "",
    mods: [],
    fragments: [],
    newFragment: {}
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus }) => {
    if (props._id !== "new") {
      props.updateTranscript(values, { setSubmitting, setStatus });
    } else {
      props.createTranscript(values, {});
    }
  }
})(Transcript);

const mapStateToProps = (state, ownProps) => {
  const { _id } = ownProps.match.params;

  return { _id };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { _id } = ownProps.match.params;
  return {
    createTranscript: (values, actions) => dispatch(thunks.createTranscript(values, actions)),
    loadTranscript: setValues => dispatch(thunks.loadTranscript(_id, setValues)),
    updateTranscript: (values, actions) => dispatch(thunks.updateTranscript(_id, values, actions))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranscriptWithFormik);
