import React, { useEffect, useState } from 'react'
import { Button, Table, Badge, Tag, Modal, Input, message } from 'antd'

import { getGroupList, createMenu, createArt } from '../../../services/api'
import _ from 'lodash';

const MenuManagePage = (props) => {


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

        },
        {
            title: 'Action / description',
            width: '30%',
            render: (text, record, index) => {

                return <>

                    <Button type="primary" danger >移除用户</Button>
                </>

            }

        },
    ];

    const data = [
        {
            id: 1,
            name: 'userLi',
            role: '管理员',
            key:'1'
        }
    ]




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