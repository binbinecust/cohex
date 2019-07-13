import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Modal } from 'antd';

import {setCurrent,setTotalNum,getDailyList,setListParams,deleteDailys} from "./actions";
import DailyTable from './components/dailyTable';
import {PAGE_SIZE} from '../constants';


class DailyList extends Component{

  state = {
    sort:-1,
    sortby:"_id"
  }
  constructor(props) {
    super(props);
    this.loadList({});
  }

  loadList=(params = {}, current = 1)=> {
    const {getDailyList,setCurrent} = this.props;
    setCurrent(current);
    getDailyList(
      {current:current , limit: PAGE_SIZE,sort:this.state.sort,sortby:this.state.sortby, ...params}
    );
    console.log(this.refs);
 };

  handlePageChange = (pagination) => {
    this.loadList({},pagination.current);
  };

  handleRowChange=(selectedRowKeys, selectedRows)=>{
     if(this.props.handleRowChange){
      this.props.handleRowChange(selectedRowKeys, selectedRows);
     }
  }

  handleTableRowClick = ({_id}) => {
    this.props.handleTableRowClick(_id);
  };

  deleteDaily=(record)=>{
    const _this=this;
    Modal.confirm({
      title: '确定要删除所选记录吗?',
      content: '删除后将无法找回',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        _this.props.deleteDailys([record._id],(json)=>{
          console.log(json);
          _this.loadList();
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });

    
  }
  editDaily=(record)=>{
    
  }

  render() {
    const {DailyList} = this.props;
    return (
      <React.Fragment>
        <DailyTable
          deleteDaily={this.deleteDaily}
          editDaily={this.editDaily}
          DailyList={DailyList}
          pageSizes={PAGE_SIZE}
          handlePageChange={this.handlePageChange}
          handleRowChange={this.handleRowChange}
          onRowClick={this.handleTableRowClick}
        />
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {
    DailyList: state.Daily.DailyList
  };
};

const mapDispatchToProps = dispatch => {
  return Object.assign({}, bindActionCreators({
    setCurrent,setTotalNum,getDailyList,setListParams,deleteDailys
  }, dispatch));
};

export default connect(mapStateToProps,mapDispatchToProps,null,{withRef:true})(DailyList);
