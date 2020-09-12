import React from "react";
import { connect } from "dva";
import { Button, Layout, Menu, Tabs, Space } from "antd";
import ReactQuill from "react-quill";
import "./blog.css";
import "react-quill/dist/quill.snow.css";
// import { SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
// import blogStyle from "./blog.css";

const { TabPane } = Tabs;
const { Content, Sider } = Layout;


class BlogsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "暂无内容",
      value: "",
      tabActiveKey: "2",
      tabProps: [
        { disabled: true, tab: "编辑", key: "0" },
        { disabled: true, tab: "预览", key: "1" },
        { disabled: true, tab: "文章基地", key: "2" },
      ],
    };
  }

  componentDidMount() {
    this.getMenuList();
  }

  getMenuList = () => {
    this.activeTabKey("-1");
    this.props.dispatch({
      type: "blogs/fetchArtList",
    });
  };

  onSelect = async ({ item, key, keyPath, selectedKeys, domEvent }) => {
    this.activeTabKey("2");
    // this.setValue("");
    console.log({ item, key, keyPath, selectedKeys, domEvent });
    const { artContentMap, dispatch } = this.props;
    let keyLabel = selectedKeys[0];
    if (!artContentMap[keyLabel]) {
      const [groupId, artId] = keyLabel.split("_");
      const data = await dispatch({
        type: "blogs/getArtContent",
        payload: {
          groupId,
          artId,
          keyLabel,
        },
      });
      this.setContent(data);
    } else {
      this.setContent(artContentMap[keyLabel]);
    }
  };

  onTabChange = (key) => {
    // console.log(key,this.state.tabActiveKey)
    this.setState({
      tabActiveKey: key,
    });
  };

  setContent = (val) => {
    this.setState({
      content: val,
    });
  };

  setValue = (val) => {
    this.setState({
      value: val,
    });
  };

  saveHandler = () => {
    // this.setState({
    //   tabActiveKey: "2",
    // });
    let rawParams = { ...this.state.content };
    rawParams.content = this.state.value;
    console.log(rawParams);

    this.props
      .dispatch({
        type: "blogs/saveArt",
        payload: rawParams,
      })
      .then(() => {
        this.getMenuList();
      });
  };

  activeTabKey = (key) => {
    this.setState({
      tabActiveKey: key,
    });
    let tabProps = [...this.state.tabProps];
    tabProps = tabProps.map((tab) => {
      if (tab.key === key) {
        tab.disabled = false;
      } else {
        tab.disabled = true;
      }
      return tab;
    });

    this.setState({
      tabProps,
    });
  };

  onEditorHandler = () => {
    this.activeTabKey("0");
    console.log(this.state.content, this.state.value);
    this.setValue(this.state.content.content);
  };

  onPreviewHandler = () => {
    this.activeTabKey("1");
  };

  render() {
    const { artList } = this.props;
    const { content, value, tabActiveKey, tabProps } = this.state;
    const {
      onSelect,
      saveHandler,
      setValue,
      onTabChange,
      onEditorHandler,
      onPreviewHandler,
    } = this;

    return (
      <Layout style={{ height: "100%" }}>
        <Sider style={{ height: "100%", width: "200px" }}>
          <Menu mode="inline" theme="dark" onSelect={onSelect}>
            {artList.map((group) => {
              return (
                <Menu.SubMenu
                  key={"sub" + group.groupId}
                  title={group.groupName}
                >
                  {group.items.length
                    ? group.items.map((item) => {
                        return (
                          <Menu.Item key={`${group.groupId}_${item.artId}`}>
                            {item.artTitle}
                          </Menu.Item>
                        );
                      })
                    : ""}
                </Menu.SubMenu>
              );
            })}
          </Menu>
        </Sider>
        <Content style={{ padding: "0 14px", boxSizing: "border-box" }}>
          <Tabs activeKey={tabActiveKey} onChange={onTabChange}>
            <TabPane {...tabProps[0]}>
              <div className={"quill_outContainer"}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <ReactQuill theme="snow" value={value} onChange={setValue} />

                  <Button type="primary" onClick={saveHandler}>
                    保存
                  </Button>
                  <Button type="primary" onClick={onPreviewHandler}>
                    预览
                  </Button>
                </Space>
              </div>
            </TabPane>
            <TabPane {...tabProps[1]}>
              <div className="ql-snow" style={{ MaxHeight: "400px" }}>
                <div
                  dangerouslySetInnerHTML={{ __html: value }}
                  className="ql-editor"
                ></div>
                <Button type="primary" onClick={saveHandler}>
                  保存
                </Button>
              </div>
            </TabPane>
            <TabPane {...tabProps[2]}>
              <div className="ql-snow" style={{ MaxHeight: "400px" }}>
                <Button onClick={onEditorHandler}>编辑</Button>
                <div
                  dangerouslySetInnerHTML={{ __html: content.content }}
                  className="ql-editor"
                ></div>
              </div>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    );
  }
}

function getState(app) {
  return {
    artList: app.blogs.artList,
    artContentMap: app.blogs.artContentMap,
  };
}

const mapDispatch = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(getState, mapDispatch)(BlogsPage);
