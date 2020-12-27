import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import labelAndInput from "../common/form/labelAndInput";
import Row from "../common/layout/row";
import { init } from "./billingCycleActions";

class BillingCycleForm extends Component {
    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            <form role='form' onSubmit={handleSubmit}>
                <Row>
                    <div className="box-body">
                        <Field
                            name='name'
                            component={labelAndInput}
                            label='Nome'
                            cols='12 4'
                            placeholder='Informe o nome'
                            readOnly={readOnly}
                        />
                        <Field
                            name='month'
                            component={labelAndInput}
                            label='Mês'
                            cols='12 4'
                            placeholder='Informe o mês'
                            type='number'
                            readOnly={readOnly}
                        />
                        <Field
                            name='year'
                            component={labelAndInput}
                            label='Ano'
                            cols='12 4'
                            placeholder='Informe o ano'
                            type='number'
                            readOnly={readOnly}
                        />
                    </div>
                </Row>
                <div className="box-footer">
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>
                        Cancelar
                    </button>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        init
    }, dispatch)

BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm)

export default connect(null, mapDispatchToProps)(BillingCycleForm)