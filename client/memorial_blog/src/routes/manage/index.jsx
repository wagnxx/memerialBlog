import React, { useEffect, useState } from 'react'
import { Space, Tabs } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import _ from 'lodash';

import MenuManagePage from './components/MenuManage'
import UserManagePage from './components/UserManage'





const SettingPage = (props) => {

    const goBack = () => {
        props.history.goBack();
    }

   const tabProps= [
        { disabled: false, tab: "菜单管理", key: "0" },
        { disabled: false, tab: "用户管理", key: "1" },

      ];
    return (
        <Space direction="vertical" style={{ width: '100%', padding: '10px' }}>
            <h2><ArrowLeftOutlined style={{ cursor: 'pointer' }} onClick={goBack} />  <span>manage page</span></h2>

            <Tabs>
                <Tabs.TabPane {...tabProps[0]}>

                    <MenuManagePage {...props} />
                </Tabs.TabPane>
                <Tabs.TabPane {...tabProps[1]}>

                    <UserManagePage {...props} />,
                </Tabs.TabPane>
            </Tabs>
        </Space>
    )
}



export default SettingPage