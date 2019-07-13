import React from 'react';
import {TableWithHead} from "../../components";
import {timestamp2fixedDate1} from "../../../utils";
import {DAILY_TYPE_NAME_MAP} from "../constants";
import {Tooltip,Icon} from 'antd';

const DailyTable = props => {

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      fixed: 'left'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: val => {
        return DAILY_TYPE_NAME_MAP[val];
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: val => timestamp2fixedDate1(val, 'MM-dd HH:mm')
    },{
      title: '总金额',
      dataIndex: 'sumMoney',
      key: '',
      render: (value,record) => {
        return record.sumMoney;
      }
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: '',
      render: (value,record) => {
        return record.content;
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: '',
      render: (value,record) => {
        return record.creator;
      }
    },
    {
      title:"操作",
      key:"action",
      render:(text, record) => (
        <span className="actions">
          <Icon type="edit" onClick={()=>props.editDaily(record)}/>
          <Icon type="delete" onClick={()=>props.deleteDaily(record)}/>
          <Icon type="eye" onClick={()=>props.onRowClick(record)}/>
        </span>
      )
    }
  ];

  const columnFiltrate = {
    defaultColumns: ['createTime']
  };

  columns.map(item => {item.width = '150px';});

  const tableProps = {aaaaa:1,
    columns: columns,
    rowKey: '_id',
    dataSource: props.DailyList.list,
    listRefreshFlag:props.DailyList.listRefreshFlag,
    pagination: {
      total: props.DailyList.totalNum,
      current: props.DailyList.current,
      pageSize: props.pageSizes,
      showTotal: () => {
        return `每页显示${props.pageSizes}条，共 ${Math.ceil(props.DailyList.totalNum / props.pageSizes)} 页，共${props.DailyList.totalNum} 条`;
      }
    },
    onChange: props.handlePageChange,
    columnFiltrate: columnFiltrate,
    scroll: {
      x: 670,
      y: 'calc(100vh - 320px)'
    },
    rowSelection:{
      onChange:props.handleRowChange
    },
    loading: props.DailyList.isLoading
  };

  return (<TableWithHead idName={"_id"} totalNum={props.DailyList.totalNum}
                         pageSize={props.pageSizes} tableProps={tableProps}/>);
};

export default DailyTable;
