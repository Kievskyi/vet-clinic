import classes from "./Payment.module.css"
import {Button, Form, Input} from "antd";

export default function Payment() {

    return (
        <>
            <div className={classes.form}>
                <Form>
                    <Form.Item>
                        <Input size={"large"} style={{width: 150}}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}