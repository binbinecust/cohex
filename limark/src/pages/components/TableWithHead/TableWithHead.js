
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';

import {PAGE_SIZE} from '../../constants';

import './index.less';
const modulePrefix = 'm-TableWithHead';


class TableWithHead extends PureComponent {
  state = {
    restSelected: false,
    selectedRows: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedRows.length >= prevProps.pageSize &&
      this.state.selectedRows.length < this.props.pageSize &&
      this.state.restSelected) {
      this.setState({restSelected: false});
      this.props.onSelectRestChange(false);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.tableProps.listRefreshFlag!=nextProps.tableProps.listRefreshFlag){
      this.setState({selectedRows:[]});
    }
  }
  setSelectedRows=(rows)=>{
    this.setState({
      selectedRows:rows
    });
  }

  handleSelectRest = () => {
    this.setState({restSelected: true});
    this.props.onSelectRestChange(true);
  }

  handleCancelSelectRest = () => {
    this.setState({restSelected: false});
    this.props.onSelectRestChange(false);
  }

  render() {
    const {
      totalNum,
      pageSize,
      tableProps: {
        rowSelection = {},
        onChange,
        ...otherTableProps
      },
      head,
      style,
      className = ''
    } = this.props;
    const selectedNum = this.state.selectedRows.length;
    let idName=this.props.idName||"id";
    let rest = null;
    if (this.state.restSelected) {
      rest = <span onClick={this.handleCancelSelectRest}>取消</span>;
    } else if (selectedNum >= pageSize) {
      rest = <span onClick={this.handleSelectRest}>选中剩余{totalNum - selectedNum}项</span>;
    }
    const num = this.state.restSelected ? totalNum : selectedNum;
    return (
      <div className={`${modulePrefix} ${className}`} style={style}>
        <div className={`${modulePrefix}-head`}>
          {
            head ? head : (
              <React.Fragment>
                <span>共{totalNum}项</span>
                {num > 0 && <span>已选中{num}项</span>}
                {rest}
              </React.Fragment>
            )
          }
        </div>
        <Table
          rowSelection={{
            ...rowSelection,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({selectedRows});
              rowSelection.onChange && rowSelection.onChange(selectedRowKeys, selectedRows);
            },
            selectedRowKeys: rowSelection.selectedRowKeys || this.state.selectedRows.map((rowDD) =>rowDD[idName])
          }}
          onChange={(...args) => {
            this.setState({selectedRows: []});
            rowSelection.onChange && rowSelection.onChange([], []);
            onChange && onChange(...args);
          }}
          {...otherTableProps}
        />
      </div>
    );
  }
}

TableWithHead.propTypes = {
  totalNum: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSelectRestChange: PropTypes.func, //选中剩余项或取消选中剩余项时触发，触发时传true或false，true表示选中了剩余
  tableProps: PropTypes.object, //ppfish table组件的属性
  head: PropTypes.node, // 自定义head，如果不传则使用默认head
  noRowSelection: PropTypes.bool, // 为true时则为普通表格，不可勾选
  style: PropTypes.object,
  className: PropTypes.string,
};
TableWithHead.defaultProps = {
  pageSize: PAGE_SIZE,
};

export default TableWithHead;
