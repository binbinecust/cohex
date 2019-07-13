import React, {Component} from 'react';
import {Popover, Layout,Menu,Modal} from 'antd';
const {Content, Sider,Header,Footer} = Layout;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PAGE_SIZE} from '../constants';
import {setCurrent,setTotalNum,getDailyList,saveDaily,deleteDailys,getDailyById} from "./actions";

import DailyList from './dailyList';
import DailyHeader from './dailyHeader';
import CreateDailyModal from './components/dailyModal';
import ShowDailyModal from './components/dailyItemsModal';
import './index.less';


class Daily extends Component{

  state={
    visible:false,
    visibleItems:false,
    edit:false,
    selectedRows:[]
  };
  showModal=()=>{
    this.setState({visible:true});
  }
  hideModal=()=>{
    this.setState({visible:false});
  }
  hideModalItems=()=>{
    this.setState({visibleItems:false});
  }
  handleCreate=(fromdata)=>{

    console.log(fromdata);
    this.setState({visible:false});
    const {saveDaily,setCurrent,getDailyList} = this.props;
    saveDaily(fromdata,()=>{
      setCurrent(1);
      getDailyList(
        {current:1 , limit: PAGE_SIZE,sort:-1,sortby:"_id"}
      );
    });
  }

  handleTableRowClick=(id)=>{console.log(id);
    this.props.getDailyById(id,(json)=>{
      console.log(json);
      this.setState({itemsLoaded:true,daily:json.result});
    });
    this.setState({visibleItems:true});
  }
  handleRowChange=(selectedRowKeys, selectedRows)=>{
    this.setState({selectedRows:selectedRows});
  }

  deleteDailys=(rows)=>{
    Modal.confirm({
      title: '确定要删除所选记录吗?',
      content: '删除后将无法找回',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const ids=rows.reduce((prev,crt,index,arr)=>{prev.push(crt._id);return prev;},[]);
        console.log(ids);
        this.props.deleteDailys(ids,(json)=>{
          console.log(json);
          this.refs.listRef.getWrappedInstance().loadList();
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
    //console.log(this.refs.listRef.getWrappedInstance());
  }

  render(){
     const { visible, edit,visibleItems,itemsLoaded,daily } = this.state;
     return (<Layout className="m-daily">
     <Header>
       <DailyHeader selectedRows={this.state.selectedRows} showModal={this.showModal} deleteDailys={this.deleteDailys}/>
     </Header>
     <Content className="table-content">
       <DailyList ref="listRef" handleRowChange={this.handleRowChange} handleTableRowClick={this.handleTableRowClick}/>
     </Content>

     <CreateDailyModal 
            edit={edit}
            visible={visible}
            handleCreate={this.handleCreate} 
            hideModal={this.hideModal}
            />
    <ShowDailyModal 
            visible={visibleItems}
            itemsLoaded={itemsLoaded}
            daily={daily}
            hideModal={this.hideModalItems}
            />
          
   </Layout>);
   }
}

const mapStateToProps = state => {
  return {
    Daily: state.Daily
  };
};

const mapDispatchToProps = dispatch => {
  return Object.assign({}, bindActionCreators({
    setCurrent,setTotalNum,getDailyList,saveDaily,deleteDailys,getDailyById
  }, dispatch));
};

export default connect(mapStateToProps,mapDispatchToProps)(Daily);

