import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, Collapse, TagsInput, Button } from "components";
import { toHHMMSS, toTwitchTimestamp } from "functions";

import { thunks } from "redux/transcripts";

class Transcripts extends Component {
  state = {
    keywords: []
  };
  componentDidMount = () => {
    this.search();
  };
  search = () => {
    this.props.search(this.state);
  };
  updateTags = tags => {
    this.setState({ keywords: tags }, () => this.search());
  };
  resetFilters = () => {
    this.setState(
      {
        keywords: []
      },
      () => this.search()
    );
  };

  render() {
    const { entries } = this.props;
    return (
      <Row type="flex">
        <Col span={1} style={{ width: 250 }}>
          <Card title="Filters">
            <Button onClick={this.resetFilters}>Reset filters</Button>
          </Card>
        </Col>

        <Col span={1} style={{ flexGrow: 1 }}>
          <Card>
            <TagsInput
              value={this.state.keywords}
              onChange={this.updateTags}
              inputProps={{
                placeholder: "Search..."
              }}
            />
          </Card>

          {entries.map((entry, entryI) => (
            <Card
              key={entryI}
              noPadding
              title={
                <>
                  {entry.twitchVOD !== "" && (
                    <>
                      <a rel="noopener noreferrer" target="_blank" href={entry.twitchVOD}>
                        Twitch VOD
                      </a>
                      {" -  "}
                    </>
                  )}
                  {entry.title}
                </>
              }
            >
              <Collapse accordion>
                {entry.fragments.map((fragment, i) => (
                  <Collapse.Panel
                    key={i}
                    header={
                      <>
                        {fragment.timestamp !== undefined && <>{toHHMMSS(fragment.timestamp)} - </>}
                        {fragment.timestamp !== undefined && entry.twitchVOD !== undefined && (
                          <>
                            <a rel="noopener noreferrer" target="_blank" href={`${entry.twitchVOD}?t=${toTwitchTimestamp(fragment.timestamp)}`}>
                              Link
                            </a>
                            {" -  "}
                          </>
                        )}
                        {fragment.title}
                      </>
                    }
                  >
                    {fragment.info}
                  </Collapse.Panel>
                ))}
              </Collapse>
            </Card>
          ))}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  ...state.transcripts
});

const mapDispatchToProps = {
  search: thunks.search
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transcripts);
