import {Card, Skeleton} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {animated, useSpring} from 'react-spring';

const {Meta} = Card;

export default function PetCard({pet, onDelete, isActive}) {
    const style = useSpring({
        to: {transform: isActive ? 'scale(1.05)' : 'scale(1)'},
        config: {duration: 200},
    });

    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return (`${year}-${month}-${day}`);
    }

    return (
        <animated.div style={style}>
            <Card
                style={{
                    width: 300,
                    margin: "40px",
                    borderRadius: 15,
                    boxShadow: "0 7px 16px rgba(169,176,202,.25)",
                }}
                actions={[
                    <DeleteOutlined key="delete" onClick={onDelete}/>,
                ]}
            >
                <Skeleton loading={false} avatar active>
                    <Meta
                        title={<p style={{fontSize: 22}}>{pet.name}</p>}
                        description={
                            <>
                                <div style={{fontSize: 18}}>
                                    <p>Type: {pet.type}</p>
                                    <p>Breed: {pet.breed}</p>
                                    <p>Born: {getFormattedDate(new Date(pet.birthDate))}</p>
                                </div>
                            </>
                        }
                    />
                </Skeleton>
            </Card>
        </animated.div>
    );
}