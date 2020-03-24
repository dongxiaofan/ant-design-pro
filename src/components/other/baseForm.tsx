import React, {Component} from 'react'
import { Form, Col, Select, Switch, Input, Button, message, TreeSelect } from 'antd'
const { Option } = Select;

class BaseForm extends Component<any,any> {
  constructor(props:any) {
    super(props)
    console.log('🌈 this.props: ', this.props)
  };

  render () {
    let {formItem, arrListDown, formRules, selectTreeNode, treeData} = this.props
    let {formData} = this.props.state

    return (
      <div className="clearfix">
        {formItem.map((item:any, index:any) => {
          if (item.type === 'select') {
            return (
              <Col span={24} key={index}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Select allowClear defaultValue={formData[item.model]}>
                    {arrListDown[`${item.options}`] ? arrListDown[`${item.options}`].map((ops:any) => {
                      return (
                        <Option key={ops.value} value={ops.value}>{ops.text}</Option>
                      )
                    }) : null}
                  </Select>
                </Form.Item>
              </Col>
            )
          } else if (item.type === 'switch') {
            return (
              <Col span={24} key={index}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>                          
                  <Switch defaultChecked={formData[item.model]} />
                </Form.Item>
              </Col>
            )
          } else if (item.type === 'tree') {
            return (
              <Col span={24} key={index}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <TreeSelect
                    // multiple
                    value={selectTreeNode}
                    treeData={treeData}
                    treeCheckable={true}
                    treeCheckStrictly={true}
                    labelInValue={false}
                  />
                </Form.Item>
              </Col>
            )
          } else {
            return (
              <Col span={24} key={index}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Input allowClear placeholder={item.placeholder} value={formData[item.model]} />
                </Form.Item>
              </Col>
            )
          }
        })}
      </div>
    )
  }
}

export default BaseForm