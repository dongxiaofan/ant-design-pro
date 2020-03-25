import React, {Component} from 'react';
import { Form, Col, Select, Switch, Input, TreeSelect, Radio, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

class BaseItem extends Component<any,any> {
  constructor(props:any) {
    super(props)
  };

  render () {
    let {formItem, arrListDown, formRules, treeData, actionUrl, templateDownLoadUrl} = this.props

    return (
      <div className="clearfix">
        {formItem.map((item:any, index:any) => {
          if (item.type === 'select') {
            return (
              <Col span={24} key={index}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Select allowClear>
                    {arrListDown[`${item.options}`] ? arrListDown[`${item.options}`].map((ops:any) => {
                      return (
                        <Option key={ops.value} value={ops.value}>{ops.text}</Option>
                      )
                    }) : null}
                  </Select>
                </Form.Item>
              </Col>
            )
          } else if (item.type === 'radio') {
            return (
              <Col span={24} key={index}>
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
          } else if (item.type === 'switch') {
            return (
              <Col span={24} key={index}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>                          
                  <Switch />
                </Form.Item>
              </Col>
            )
          } else if (item.type === 'tree') {
            return (
              <Col span={24} key={index}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <TreeSelect
                    // multiple
                    treeData={treeData}
                    treeCheckable={true}
                    treeCheckStrictly={true}
                    labelInValue={false}
                  />
                </Form.Item>
              </Col>
            )
          } else if (item.type === 'file') {
            return (
              <Col span={24} key={index}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>                  
                  <Upload action={actionUrl}>
                    <Button>选择文件</Button>
                  </Upload>
                </Form.Item>
              </Col>
            )
          } else {
            return (
              <Col span={24} key={index}>
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