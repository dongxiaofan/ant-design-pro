import React, {Component} from 'react';
import { Form, Col, Select, Switch, Input, TreeSelect, Radio, Upload, Button, Cascader } from 'antd';
const { Option } = Select;

class BaseItem extends Component<any,any> {
  constructor(props:any) {
    super(props)
  };

  render () {
    let {formItem, arrListDown, formRules, treeData, actionUrl, selectNode, areaTree} = this.props

    return (
      <div className="clearfix">
        {formItem.map((item:any, index:any) => {
          if (item.type === 'select') {
            return (
              <Col span={24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Select allowClear>
                    {arrListDown[`${item.options}`] ? arrListDown[`${item.options}`].map((ops:any) => {
                      return (
                        <Option key={ops.value} value={item.valType == 'number' ? +ops.value : ops.value}>{ops.text ? ops.text : ops.label}</Option>
                      )
                    }) : null}
                  </Select>
                </Form.Item>
              </Col>
            )
          }
          else if (item.type === 'radio') {
            return (
              <Col span={24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Radio.Group>
                    {arrListDown[`${item.options}`] ? arrListDown[`${item.options}`].map((radio:any) => {
                      return (
                        <Radio key={radio.value} value={radio.value}>{radio.text}</Radio>
                      )
                    }) : null}
                  </Radio.Group>
                </Form.Item>
              </Col>
            )
          }
          else if (item.type === 'switch') {
            return (
              <Col span={24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>                          
                  <Switch />
                </Form.Item>
              </Col>
            )
          }
          else if (item.type === 'tree') {
            return (
              <Col span={24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <TreeSelect
                    multiple
                    allowClear
                    treeData={treeData}
                    treeCheckable={true}
                    labelInValue={true}
                  />
                </Form.Item>
              </Col>
            )
          }
          else if (item.type === 'areaCascader') {
            return (
              <Col span={24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Cascader
                    options={areaTree}
                    className="mb-10"
                  />
                  <Input allowClear placeholder={item.placeholder} />
                </Form.Item>
              </Col>
            )
          }
          else if (item.type === 'file') {
            return (
              <Col span={24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>                  
                  <Upload action={actionUrl}>
                    <Button>选择文件</Button>
                  </Upload>
                </Form.Item>
              </Col>
            )
          }
          else {
            return (
              <Col span={24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Input allowClear placeholder={item.placeholder} />
                </Form.Item>
              </Col>
            )
          }
        })}
      </div>
    )
  }
}

export default BaseItem