import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Modal, Button, Input, Switch, Select,DatePicker,InputNumber } from 'antd';
const FormItem = Form.Item;

import { MAX_NAME_LEN } from '../../constants';
import { DAILY_ITEM_TYPE,DAILY_ITEM_LEVEL } from '../constants';

const FormLayout = { labelCol: { span: 3 }, wrapperCol: { span: 13, offset: 0 } };

class DailyItem extends Component{

  static propTypes = {
    item: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state={
     
    }
  }

  onSave=()=>{
    // //console.log(this.itemForm.props.form);
    // console.log(this.props.form.getFieldsValue());
    // //console.log(this.state.detail);
    // const itemData=this.props.form.getFieldsValue();
    // if(itemData.time){
    //   itemData.time=itemData.time._d.getTime();
    // }else{
    //   itemData.time=new Date().getTime();
    // }
    
    this.props.handleSaveItem();
  }

  onCancel=()=>{
    this.props.handleCancelItem(this.props.item);
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {item} = this.props;
    return (
        <Form ref="from" key={item.key} layout="horizontal">
          <FormItem label="金额" {...FormLayout}>
            {getFieldDecorator('money', {
              rules: [{ 
                required: true 
                }],
                initialValue:item.money
            })(
              <InputNumber min={1} max={1000000} />
            )}
          </FormItem>
          <FormItem label="时间" {...FormLayout}>
            {getFieldDecorator('time', {
              rules: [{ 
                required: true
                }]
            })(
              <DatePicker showTime />
            )}
          </FormItem>
          <FormItem label="地点" {...FormLayout}>
            {getFieldDecorator('place', {
              rules: [{ 
                required: true, whitespace: true, message: '请输入地点' 
                }],
                initialValue:item.place
            })(
              <Input placeholder="请输入中继名称，不超过20个字" autoComplete="off" maxLength={MAX_NAME_LEN} />
            )}
          </FormItem>
          <FormItem label="人物" {...FormLayout}>
            {getFieldDecorator('persons', {
              rules: [{ 
                required: true, whitespace: true, message: '请输入人物' 
                }],
                initialValue:item.persons
            })(
              <Input placeholder="请输入人物" autoComplete="off" maxLength={MAX_NAME_LEN} />
            )}
          </FormItem>
          <FormItem label="内容" {...FormLayout}>
            {getFieldDecorator('content', {
              rules: [{ 
                 whitespace: true, message: '请输入内容' 
                },],
                initialValue:item.content
            })(
              <Input.TextArea placeholder="请输入内容" autoComplete="off" maxLength={MAX_NAME_LEN} />
            )}
          </FormItem>
          <FormItem label="分类"
                  {...FormLayout}
              >
                {getFieldDecorator('type', {
                  rules: [
                    {message: '请选择分类' },
                  ],initialValue:item.type
                })(
                  <Select 
                    placeholder="请选择分类">
                    {DAILY_ITEM_TYPE.map(item => <Select.Option value={item.key.toString()} key={item.key.toString()}>{item.label}</Select.Option>)}
                  </Select>
                )}
            </FormItem>
            <FormItem label="重要程度"
                  {...FormLayout}
              >
                {getFieldDecorator('level', {
                  rules: [
                    { message: '请选择重要程度' },
                  ],initialValue:item.level
                })(
                  <Select 
                    placeholder="请选择重要程度">
                    {DAILY_ITEM_LEVEL.map(item => <Select.Option value={item.key.toString()} key={item.key.toString()}>{item.label}</Select.Option>)}
                  </Select>
                )}
            </FormItem>
            {/* <FormItem className="ant-form-item-btn" label="  "
                  {...FormLayout}
              >
               <Button onClick={this.onSave} size="small">保存</Button>
               <Button onClick={this.onCancel} size="small">取消</Button>
            </FormItem> */}
        </Form>
    );
  }
}

const WrappedForm = Form.create({
  onFieldsChange(props, changedFields) {
  },
  mapPropsToFields(props) {
    return {};
  }
})(DailyItem);
export default WrappedForm;
