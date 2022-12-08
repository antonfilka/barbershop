/** @jsxImportSource @emotion/react */
import React from 'react';
import { Layout } from 'antd';
import { MainRouter } from 'routers';

const { Content } = Layout;

export function MainLayout() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Content style={{ width: '100%' }}>
        <MainRouter />
      </Content>
    </Layout>
  );
}
