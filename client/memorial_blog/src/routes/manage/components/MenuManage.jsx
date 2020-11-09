import React, { useEffect, useState } from 'react'
import { Button, Table, Badge, Tag, Modal, Input, message } from 'antd'

import { getGroupList, createMenu, createArt } from '../../../services/api'
import _ from 'lodash';

const MenuManagePage = (props) => {

    const [menuList, setData] = useState([]);

    const fetGroupList = async () => {
        const data = await getGroupList();
        return data.data;
    }

    useEffect(() => {
        async function fetchData() {
            const result = await fetGroupList();
             
            let menuListGroupByGROUPID = result && result.data ? _.groupBy(result.data, g => g.group_id) : {};
            console.log(menuListGroupByGROUPID)
            var r = Object.keys(menuListGroupByGROUPID).length > 0 ? _.map(menuListGroupByGROUPID, function (value, prop) {
                let gName = value[0].name;
                value = value.map(v => {
                    v.key = `${prop}-${v.art_id}`;
                    return v;
                })
                return { gid: prop, gName, key: prop, children: value };
            }) : []


            setData(r)


        }
        fetchData();
    }, []);

    const columns = [
        {
            title: 'Name/title',
            dataIndex: 'name',
            width: '20%',
            render: (text, record, index) => {
                if (record.gid) {
                    return <strong>{record.gName}</strong>;
                } else {
                    return record.title
                }
            }
        },
        {
            title: 'group_id / art_id',
            dataIndex: 'id',
            // width: '30%',
            render: (text, record, index) => {
                if (record.gid) {
                    return record.gid;
                } else {
                    return record.art_id
                }
            }
        },
        {
            title: '创建者',
            dataIndex: 'username',
            // width: '30%',
            render: (text, record, index) => {
                if (record.gid) {
                    return  'sys';
                } else {
                    return record.username
                }
            }
        },
        {
            title: 'Action / description',
            width: '30%',
            render: (text, record, index) => {
                if (record.gid) {
                    return <>
                        <Tag color="#f50">组</Tag>
                        <Button type="primary" onClick={() => addNewArt(record.gid)}>添加新篇</Button>
                    </>

                } else {
                    return <><Tag color="#87d068">文章</Tag> <Tag color="#108ee9">{record.name}</Tag> </>
                }
            }

        },
    ];





    const [modalVal, setModalVal] = useState();
    const [modalVisible, modalVisibleChange] = useState(false);


    const modalInputChangeHandler = e => {
        setModalVal(e.target.value)
    }


    const createGroup = () => {
        modalVisibleChange(true)
    }



    const onCancelHandler = () => {
        modalVisibleChange(false)
        setModalVal('');
    }

    const onOkHandler = () => {
        modalVisibleChange(false)
        console.log(modalVal)
        if (actived_GroupId > -1) {

            createArtHandler();
        } else {
            createMenuHandler()
        }
        setModalVal('');
    }

    const createMenuHandler = () => {
        if (modalVal) {

            createMenu({ name: modalVal })
                .then(res => {
                    let data = res.data;
                    if (data.errno !== 0) {
                        message.error(data.message);
                    } else {
                        message.success(data.message)
                    }
                })
        }
    }
    const createArtHandler = () => {
        if (modalVal) {

            createArt({ name: modalVal, groupId: actived_GroupId })
                .then(res => {
                    let data = res.data;
                    if (data.errno !== 0) {
                        message.error(data.message);
                    } else {
                        message.success(data.message)
                    }
                })
        }
    }


    let [actived_GroupId, setGroupActive] = useState(-1);




    const addNewArt = (gid) => {
        setGroupActive(gid)
        modalVisibleChange(true)
    }



    return (
        <>
            <Modal
                title='请输入新增分组的名字'
                onCancel={onCancelHandler}
                onOk={onOkHandler}
                visible={modalVisible}

            >
                <Input value={modalVal} onChange={modalInputChangeHandler}></Input>
            </Modal>
            <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <span>菜单管理</span>
                <Button style={{ float: 'right' }} onClick={createGroup} type="primary">添加新的分组</Button>

            </h3>
            <Table
                bordered
                columns={columns}
                dataSource={menuList}
            />
        </>
    )
}



export default MenuManagePage