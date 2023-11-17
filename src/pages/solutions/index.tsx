/*
 * @Author: dongwei
 * @Date: 2023-07-26 11:08:43
 * @LastEditors: dongwei
 * @LastEditTime: 2023-08-05 17:27:06
 * @Description: Description
 */
import { getServerSidePropsResult } from 'libs/utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Layout, Menu, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { developmentLink, productionLink } from '@/lib/config/config';
import {
  LinkOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useHook } from 'libs/components';
const { Title, Paragraph } = Typography;
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
        getItem('Video', '1'),
        getItem('Demonstration', '2'),
      ]),
      getItem('Demo Apps', '3'),
      getItem('CBDC INR (UDPN)', 'sub2', null, [
        getItem('Issuing Bank System', '4'),
        getItem(
          <a
            href="https://etherscan.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            UDPN Explorer
          </a>,
          '5',
          <LinkOutlined />
        ),
      ]),
      getItem('CBDC EUR(Filia)', 'sub3', null, [
        getItem(
          <a
            href="https://fsp1.udpn.gdfilia.com/dashboard/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FSP System
          </a>,
          '6',
          <LinkOutlined />
        ),
      ]),
      getItem('FX Settlement System', '7'),
      getItem('Central Bank', 'sub4', null, [
        getItem('Central Bank System (UDPN)', '8'),
        getItem(
          <a
            href="https://cb.udpn.gdfilia.com/dashboard/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Central Bank System (Filia)
          </a>,
          '9',
          <LinkOutlined />
        ),
      ]),
    ];
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    query.key ? [query.key as string] : ['1']
  );
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [, setIfShow] = useState(false);
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
          openKeys={openKeys}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          selectedKeys={selectedKeys}
          onSelect={(e) => {
            if (e.key != '7') setIfShow(true);
            else setIfShow(false);
            if (e.keyPath.length === 1) setOpenKeys([]);
            console.log([e.key]);
            setSelectedKeys([e.key]);
          }}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout>
        <Content>
          <div className="bg-[#F4F9FD] w-full h-full">
            {/* {childContent(selectedKeys[0])} */}
            <DescriptionContent links={links} keys={selectedKeys[0]} />
            <MobileContent links={links} keys={selectedKeys[0]} />
            <IssuingBankContent links={links} keys={selectedKeys[0]} />
            <FXContent links={links} keys={selectedKeys[0]} />
            <CentralBankontent links={links} keys={selectedKeys[0]} />;
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const DescriptionContent = (props: BCMP.Objects) => {
  console.log(props);

  return (
    <>
      <div
        className={
          'p-12 ' + (props.keys == '1' || props.keys == '2' ? '' : 'hidden')
        }
      >
        <div>
          <Typography>
            <Title>Description</Title>
            <Paragraph>
              This use case demonstrates how a bank can issue a stablecoin on
              the UDPN Network. This stablecoin can be only used exclusively by
              the bank’s own customers through the bank’s internal system and
              UDPN Business Node, or permission can be granted to allow the
              bank’s enterprise customers to directly access the stablecoin via
              their own Business Nodes on the UDPN network so they can perform a
              wide variety of business transactions with the stablecoin wallets
              without going through the bank’s internal systems. If the bank
              backs the stablecoin with fiat money or assets, then it can also
              be used among financial institutions on the UDPN Network for the
              purpose of wholesale and financial transaction settlements and
              reconciliations. If this stablecoin is open to the public for
              retail purposes, the bank might require regulatory approval from
              related authorities.
            </Paragraph>
            <Title>As a Stablecoin Operator</Title>
            <Paragraph>
              In this PoC use case, it is the participating bank. The owner has
              absolute control over everything related to the stablecoin,
              including but not limited to, the volume issued and circulated,
              the access control of third-party business systems, the
              freezing/unfreezing of wallets, adjustment of transaction and
              deposit limits of a certain wallet type or wallets, the KYC
              verification, etc.
            </Paragraph>
            <Title>As a Client of Bank</Title>
            <Paragraph>
              The IT system authorized by the Stablecoin Operator to not only
              access the stablecoin smart contracts and initialize transactions
              directly but also can create KYC-based regular and business
              wallets. The bank’s own IT system is in this category as well as
              other partner banks (or other businesses) whose KYC processes are
              trusted by the Stablecoin Operator. The basic process is that the
              partner banks need to create a Business Wallet with the Stablecoin
              Operator and transfer fiat money to the Custodian Account in order
              to receive the stablecoins from the Repository to the Business
              Wallet. Through the partner bank’s own app or website, its end
              users can create wallets and top-up their wallets with fiat money.
              The partner bank then transfers stablecoins from the Business
              Wallet to the Regular Wallet. This type of business system must be
              trusted by the Stablecoin Operator and business agreements must be
              signed, as the KYC-enabled Business System can choose to host all
              private keys.
            </Paragraph>
            <Title>As an End User</Title>
            <Paragraph>
              End Users can be either individuals or enterprises, depending on
              the business needs and models of the Business Systems. The
              Business Systems can design whatever front-end applications to
              serve their end users based on the APIs provided by the UDPN
              Business Node and the stablecoin smart contracts. End Users don’t
              really have much interaction with the stablecoin system. In this
              PoC Use Case, a simple end-user mobile application will be
              developed as the Stablecoin Owner’s application to demonstrate an
              end-to-end lifecycle of the PoC process. This simple mobile
              application will have private key management, private key
              signing/verification, wallet management, stablecoin balance,
              simple transfer, linked bank account management, etc.
            </Paragraph>
          </Typography>
        </div>
      </div>
    </>
  );
};
const MobileContent = (props: BCMP.Objects) => {
  return (
    <>
      <div
        className={
          'w-full bg-[#F4F9FD] rounded-md flex pl-12 pr-12 pb-10 items-center ' +
          (props.keys == '3' ? '' : 'hidden')
        }
      >
        <div className="flex justify-center w-full ">
          <div className="bg-black w-98 h-204  rounded-[2.4rem] flex items-center justify-center">
            <div className="rounded-[2.4rem] w-96 h-[50.31rem] overflow-hidden bg-white">
              <iframe
                src={props.links.demoAppsLink2}
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="bg-black w-98 h-204  rounded-[2.4rem] flex items-center justify-center">
            <div className="rounded-[2.4rem] w-96 h-[50.31rem] overflow-hidden bg-white">
              <iframe
                src={props.links.demoAppsLink1}
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const IssuingBankContent = (props: BCMP.Objects) => {
  return (
    <>
      <div
        className={
          'bg-[#F4F9FD] shadow w-full h-full ' +
          (props.keys == '4' ? '' : 'hidden')
        }
      >
        <iframe
          className="w-full h-full border-0"
          src={props.links.IssuingBankSystem}
        ></iframe>
      </div>
    </>
  );
};

const FXContent = (props: BCMP.Objects) => {
  return (
    <>
      <div className={'w-full h-full ' + (props.keys == '7' ? '' : 'hidden')}>
        <iframe
          className={'w-full h-full border-0'}
          src={`${props.links.FXSettlementSystem}/?loginName=admin&password=cbdc#123`}
        ></iframe>
      </div>
    </>
  );
};

const CentralBankontent = (props: BCMP.Objects) => {
  return (
    <>
      <div className={'w-full h-full ' + (props.keys == '8' ? '' : 'hidden')}>
        <iframe
          className="w-full h-full border-0"
          src={props.links.CentralBankSystem}
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
