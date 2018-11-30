import React from "react";

import Form from "antd/lib/form";

import BaseInput from "antd/lib/input";

import Input from "./form/Input";
import InputNumber from "./form/InputNumber";
import Block from "./form/Block";
import Select from "./form/Select";
import DatePicker from "antd/lib/date-picker";
import Checkbox from "./form/Checkbox";

Form.Input = Input;
Form.InputNumber = InputNumber;
Form.Block = Block;
Form.Select = Select;
Form.DatePicker = DatePicker;
Form.TextArea = BaseInput.TextArea;
Form.Checkbox = Checkbox;

Form.Text = ({ children }) => <span className="ant-form-text">{children}</span>;

export default Form;
