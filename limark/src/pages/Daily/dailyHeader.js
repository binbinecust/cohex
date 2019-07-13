import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'antd';
class DailyHeader extends Component{

  constructor(props){
    super(props);
  }
  showModal=()=>{
    const {showModal} = this.props;
    showModal();
  }
  delSelects=()=>{
    const {deleteDailys,selectedRows} = this.props;
    deleteDailys(selectedRows);
  }
  render() {
    
    return (
      <div className="m-header">
        <div className="tit">日常记录</div>
        <div className="btns"><Button type="primary" onClick={this.showModal}>创建日报</Button><Button disabled={this.props.selectedRows.length<1} type="primary" onClick={this.delSelects}>删除</Button></div>
        
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
   
  };
};

const mapDispatchToProps = dispatch => {
  return Object.assign({}, bindActionCreators({

  }, dispatch));
};

export default connect(mapStateToProps,mapDispatchToProps)(DailyHeader);
