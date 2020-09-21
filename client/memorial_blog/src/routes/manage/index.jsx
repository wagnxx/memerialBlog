import React, { useEffect, useState } from 'react'
import { Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import _ from 'lodash';

import MenuManagePage from './components/MenuManage'





const SettingPage = (props) => {

    const goBack = () => {
        props.history.goBack();
    }
    return (
        <Space direction="vertical" style={{ width: '100%', padding: '10px' }}>
            <h2><ArrowLeftOutlined style={{ cursor: 'pointer' }} onClick={goBack} />  <span>manage page</span></h2>
            <MenuManagePage {...props} />,
        </Space>
    )
}



export default SettingPage