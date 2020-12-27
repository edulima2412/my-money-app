import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import LabelAndInput from "../common/form/labelAndInput";
import Row from "../common/layout/row";
import { init } from "./billingCycleActions";
import ItemList from "./itemList";
import Summary from "./summary";

class BillingCycleForm extends Component {

    calculateSummary() {
        const sum = (t, v) => t + v
        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebits: this.props.debits.map(d => +d.value || 0).reduce(sum),
        }
    }
    
    render() {
        const { handleSubmit, readOnly, credits, debits } = this.props
        const { sumOfCredits, sumOfDebits } = this.calculateSummary()
        return (
            <form role='form' onSubmit={handleSubmit}>
                <Row>
                    <div className="box-body">
                        <Field
                            name='name'
                            component={LabelAndInput}
                            label='Nome'
                            cols='12 4'
                            placeholder='Informe o nome'
                            readOnly={readOnly}
                        />
                        <Field
                            name='month'
                            component={LabelAndInput}
                            label='Mês'
                            cols='12 4'
                            placeholder='Informe o mês'
                            type='number'
                            readOnly={readOnly}
                        />
                        <Field
                            name='year'
                            component={LabelAndInput}
                            label='Ano'
                            cols='12 4'
                            placeholder='Informe o ano'
                            type='number'
                            readOnly={readOnly}
                        />
                        <Summary credit={sumOfCredits} debit={sumOfDebits}/>
                        <ItemList cols='12 6 6'
                            list={credits}
                            readOnly={readOnly}
                            field='credits'
                            legend='Créditos'
                        />
                        <ItemList cols='12 6 6'
                            list={debits}
                            readOnly={readOnly}
                            field='debits'
                            legend='Débitos'
                            showStatus={true}
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

BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm)
const selector = formValueSelector('billingCycleForm')

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        init
    }, dispatch)

const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debits: selector(state, 'debits')
})

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)