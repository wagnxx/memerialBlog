import React, { useEffect, useState } from 'react'
import { Button, Table, Badge, Tag, Modal, Input, message, Space } from 'antd'

import { getUsers, createMenu, createArt } from '../../../services/api'
import _ from 'lodash';

const MenuManagePage = (props) => {

    const unImplementFunc = () => {
        message.destroy();
        message.warning({
            title:'温馨提示',
            content:'该功能还未实现'
        });
        return false;
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '20%',

        },
        {
            title: 'Id',
            dataIndex: 'id',
            width: '20%',

        },
        {
            title: 'Role',
            dataIndex: 'role',
            width: '20%',
            render: (text, record, index) => record.role.name || '~'

        },
        {
            title: 'Action / description',
            width: '30%',
            render: (text, record, index) => {

                return <Space>

                    <Button type="primary" onClick={unImplementFunc}>修改角色</Button>
                    <Button type="primary" danger onClick={unImplementFunc}>移除用户</Button>
                </Space>

            }

        },
    ];

    const initData = [
        {
            id: 1,
            name: 'userLi',
            role: { name: '管理员' },
            key: '1'
        }
    ]

    let [data, setData] = useState(initData)


    // getUsers
    useEffect(() => {
        async function fetchData() {
            const result = await getUsers();



            let r = result.data ? result.data.data.map(d => {
                d.key = d.id;
                return d;
            }) : []



            setData(r)


        }
        fetchData();
    }, []);







    return (
        <>

            <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <span>用户管理</span>
                {/* <Button style={{ float: 'right' }} onClick={createGroup} type="primary">添加新的分组</Button> */}

            </h3>
            <Table
                bordered
                columns={columns}
                dataSource={data}
            />
        </>
    )
}



export default MenuManagePage