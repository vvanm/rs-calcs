import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { Table, Card, Button } from "components";

import { thunks } from "redux/admin/transcripts/directory";

class Directory extends Component {
  componentDidMount = () => {
    this.props.search();
  };
  render() {
    return (
      <Card
        noPadding
        extra={
          <Link to="/admin/transcripts/new">
            <Button>New</Button>
          </Link>
        }
        title="Transcripts directory"
      >
        <Table
          size="default"
          dataSource={this.props.entries}
          columns={[
            {
              title: "Title",
              key: "title",
              dataIndex: "title"
            },
            {
              title: "Type",
              key: "type",
              render: record => record.type
            },
            {
              title: "Date published",
              key: "datePublished",
              render: record => moment(record.publishDate).format("L")
            },
            {
              title: "Created",
              key: "created",
              render: record => `${record.createdByName} - ${moment(record.createdOn).format("L")}`
            },
            {
              title: "Link",
              key: "link",
              render: record => (
                <>
                  {record.twitchVOD !== undefined && record.twitchVOD}
                  {record.patchNotesLink !== undefined && record.patchNotesLink}
                </>
              )
            },
            {
              title: "Keywords",
              key: "keywords",
              render: record => record.keywordsCount
            },
            {
              title: "Mods",
              key: "mods",
              render: record => record.modsCount
            },
            {
              title: "Fragments",
              key: "fragments",
              render: record => record.fragmentsCount
            },
            {
              title: "Options",
              key: "options",
              render: record => (
                <Button.Group>
                  <Button icon="delete" />
                  <Link to={`/admin/${record.ID}`}>
                    <Button icon="folder" />
                  </Link>
                </Button.Group>
              )
            }
          ]}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  ...state.admin.transcripts.directory
});

export default connect(
  mapStateToProps,
  { search: thunks.search }
)(Directory);
