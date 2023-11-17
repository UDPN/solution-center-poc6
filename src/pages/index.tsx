/* eslint-disable react/no-unescaped-entities */
/*
 * @Author: dongwei
 * @Date: 2023-07-26 11:08:43
 * @LastEditors: huangyuexia
 * @LastEditTime: 2023-09-20 09:31:53
 * @Description: Description
 */
import { getServerSidePropsResult } from 'libs/utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Layout, Menu } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { developmentLink, productionLink } from '@/lib/config/config';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useHook } from 'libs/components';
type MenuItem = Required<MenuProps>['items'][number];

const SOLURIONS: NextPage = () => {
  const { query } = useHook();
  const [links, setLinks] = useState({});
  useEffect(() => {
    if (process.env.pocType == 'development') {
      setLinks(developmentLink);
    } else {
      setLinks(productionLink);
    }
  }, []);
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const { Sider, Content } = Layout;
  const items: MenuProps['items'] = useMemo(() => {
    return [
      getItem('Tutorial', 'sub1', null, [
        getItem(
          <a
            href="/static/UDPN PoC Use Case 6-Enabling Gasless Transactions Using Public Chain-based Stablecoins-User Manual.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            User Manual
          </a>,
          '1'
        ),
      ]),
      getItem(<span className="font-bold">Demo System</span>, '2'),
    ];
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    query.key ? [query.key as string] : ['2']
  );
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="w-full h-full">
      <Sider
        width={320}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: 'white' }}
      >
        <div className="demo-logo-vertical" />
        <div className="px-4 flex justify-end py-6">
          <div className="font-semibold pl-4 leading-6 text-xl">
            Enabling Gasless Transactions Using Public Chain-based Stablecoins
          </div>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            className="ml-4"
            style={{ marginBottom: 20 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <Menu
          style={{
            paddingLeft: '1rem',
            paddingRight: '1rem',
            border: 0,
            display: collapsed ? 'none' : 'block',
          }}
          defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          selectedKeys={selectedKeys}
          onSelect={(e) => {
            if (e.keyPath.length === 1) setOpenKeys([]);
            setSelectedKeys([e.key]);
          }}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout>
        <Content>
          <div className="bg-[#F4F9FD] w-full h-screen">
            <SystemContent links={links} keys={selectedKeys[0]} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const SystemContent = (props: BCMP.Objects) => {
  return (
    <>
      <div className={'w-full h-full ' + (props.keys == '2' ? '' : 'hidden')}>
        <iframe
          className={'w-full h-full border-0'}
          src={props.links.Poc6System}
        ></iframe>
      </div>
    </>
  );
};
export default SOLURIONS;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return getServerSidePropsResult([], {
    ...(await serverSideTranslations(locale || '', [
      'common',
      'router',
      'stablecoin-manage',
    ])),
  });
};
