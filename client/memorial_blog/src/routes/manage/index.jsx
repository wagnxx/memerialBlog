import React, { useEffect, useState } from 'react'
import { Space } from 'antd'

import _ from 'lodash';

import MenuManagePage from './components/MenuManage'





const SettingPage = () => {

    return (
        <Space direction="vertical" style={{ width: '100%', padding: '10px' }}>
            <h2>manage page</h2>
            <MenuManagePage />,
        </Space>
    )
}



export default SettingPage