import React, {Component} from 'react';
import { Form, Col, Select, Switch, Input, TreeSelect, Radio, Upload, Button, Cascader, DatePicker } from 'antd';
const { Option } = Select;

class BaseItem extends Component<any,any> {
  constructor(props:any) {
    super(props)
  };

  handleLoadData = (selectedOptions :any) => {
    console.log('selectedOptions : ', selectedOptions )
  }

  render () {
    let {formItem, formItemCol, arrListDown, formRules, treeData, actionUrl, templateUrl, areaTree} = this.props

    return (
      <div className="ant-row">
        {formItem.map((item:any, index:any) => {
          if (item.type === 'select') {
            return (
              <Col span={formItemCol || 24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Select
                    allowClear
                    showSearch
                    filterOption={(input:any, option:any) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
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
              <Col span={formItemCol || 24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Radio.Group>
                    {arrListDown[`${item.options}`] ? arrListDown[`${item.options}`].map((radio:any) => {
                      return (
                        <Radio key={radio.value} value={radio.value}>{radio.label}</Radio>
                      )
                    }) : null}
                  </Radio.Group>
                </Form.Item>
              </Col>
            )
          }
          else if (item.type === 'date') {
            return (
              <Col span={formItemCol || 24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <DatePicker picker={item.pickerType} />
                </Form.Item>
              </Col>
            )
          }
          else if (item.type === 'switch') {
            return (
              <Col span={formItemCol || 24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>                          
                  <Switch />
                </Form.Item>
              </Col>
            )
          }
          else if (item.type === 'tree') {
            return (
              <Col span={formItemCol || 24} key={index} className={item.style}>
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
              <Col span={formItemCol || 24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Cascader options={areaTree} />
                </Form.Item>
              </Col>
            )
          }
          else if (item.type === 'upload') {
            return (
              <Col span={formItemCol || 24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <div>
                    {item.hasTemplate ? <Button className="mr-10" href={templateUrl} target="_blank">模板下载</Button> : null}
                    <Upload action={actionUrl} accept={item.accept}>
                      <Button type="primary" ghost>选择文件</Button>
                    </Upload>
                  </div>
                </Form.Item>
              </Col>
            )
          }
          else {
            return (
              <Col span={formItemCol || 24} key={index} className={item.style}>
                <Form.Item label={item.label} name={item.model} rules={formRules[`${item.model}`]}>
                  <Input allowClear placeholder={item.placeholder} type={item.valType || ''} disabled={item.isGive} />
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