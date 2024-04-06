import {Button, Form} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import classes from "./Feedback.module.css"

export default function Feedback() {

    return (
        <>
            <div className={classes.form}>
                <Form>
                    <Form.Item>
                        <TextArea rows={10}/>
                    </Form.Item>
                    <Form.Item>
                        <Button>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}