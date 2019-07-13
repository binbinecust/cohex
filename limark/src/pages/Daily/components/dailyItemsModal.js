import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Modal, Button, Input, Switch, Select,DatePicker,Spin,Icon } from 'antd';
import {DAILY_TYPE_NAME_MAP,DAILY_ITEM_TYPE_MAP,DAILY_ITEM_LEVEL_MAP} from "../constants";
const modulePrefix = 'm-daily-modal';

class DailyItemsModal extends Component{

  static propTypes = {
    edit: PropTypes.bool,
    visible: PropTypes.bool,
    onCreate: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps={
   
  }
  constructor(props) {
    super(props);
    this.state={
      detail:{
        "type":0,
        "accountId" : 0,
        "date":"",
        "createTime" :new Date().getTime(),
        "editTime" : new Date().getTime(),
        "creatorId" : 0,
        "creator" : "",
        "sumMoney" : 0,
        "content" : "",
        items:[]
      }
      
    }
  }

  componentWillReceiveProps(nextProps){console.log(nextProps.daily);
      // if(nextProps.visible&&!this.props.visible){
      //   this.setState({
      //     itemsLoaded:false
      //   });
      // }
      if(nextProps.daily&&nextProps.daily._id!=this.state.detail._id){
        this.setState({
          detail:nextProps.daily,
          itemsLoaded:true
        });
      }
  }

  delItem=(index)=>{
     this.state.detail.items.splice(index,1);
     this.setState({
      detail:this.state.detail
    });
  }

  handleClose=()=>{
    const {hideModal } = this.props;
    this.state.itemsLoaded=false;
    hideModal();
  }
  render(){
    const {visible } = this.props;
    const {detail,itemsLoaded}=this.state;
    return (
      <Modal
        className={modulePrefix}
        title="详情"
        width={760}
        visible={visible}
        onCancel={this.handleClose}
        footer={
        <div>
          <Button key="back" onClick={this.handleClose} className="u-btn-normal" size="large">关闭</Button>
        </div>
        }
      >
      {itemsLoaded?(<div className="daily-show">
          <div className="item-show">
            <dl><dt>金额：</dt><dd>{detail.sumMoney}</dd></dl>
            <dl><dt>日期：</dt><dd>{detail.date}</dd></dl>
          </div>
          <div className="item-show">
            <dl><dt>内容：</dt><dd>{detail.content}</dd></dl>
          </div>
          <div className="item-show">
          <dl><dt>分类：</dt><dd>{DAILY_TYPE_NAME_MAP[detail.type]}</dd></dl>
          </div>
          </div>):<Spin tip="Loading..."></Spin>}
       
        <hr/>
        {itemsLoaded&&detail.items.map((item,index) =>
        <div key={item._id}>
          <div className="items-show">
          {/* <span className="links">
          <a onClick={()=>{this.delItem(index);}}>删除</a>
          </span> */}
          <div className="item-show">
            <dl><dt>金额：</dt><dd>{item.money}</dd></dl>
            <dl><dt>时间：</dt><dd>{item.time}</dd></dl>
          </div>
          <div className="item-show">
            <dl><dt>地点：</dt><dd>{item.place}</dd></dl>
            <dl><dt>人物：</dt><dd>{item.persons}</dd></dl>
          </div>
          <div className="item-show">
            <dl><dt>内容：</dt><dd>{item.content}</dd></dl>
          </div>
          <div className="item-show">
          <dl><dt>分类：</dt><dd>{DAILY_ITEM_TYPE_MAP[item.type]}</dd></dl>
          <dl><dt>重要程度：</dt><dd>{DAILY_ITEM_LEVEL_MAP[item.level]}</dd></dl>
          </div>
          </div>
        </div>)}
       
      </Modal>
    );
  }
}

const WrappedForm = Form.create({
  onFieldsChange(props, changedFields) {
    //props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      
    };
  }
})(DailyItemsModal);
export default WrappedForm;
