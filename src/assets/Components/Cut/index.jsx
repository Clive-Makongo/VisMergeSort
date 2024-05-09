import Col from "../Column";
import Array from "../Array";

//MY CUT FUNCTION. FIX THIS WITH HELPER FUNCTION
const cut = (arr) => {

    // Set the amount of columns to display
    let amount = ``;

    // Set the amount of columns to display if Array is 12 or more
    if (arr.length >= 12 && array) {
        amount = 'md-6';
        console.log(`Amount: ${amount}`);

        const splitIndex = Math.ceil(array.length / 2);
        const arr1 = array.slice(0, splitIndex);
        const arr2 = array.slice(splitIndex, arr.length);

        console.log(`First Half: ${arr1}, Second Half: ${arr2}`);
        return (
            <>
                <h1>TWO</h1>
                <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                    <Array array={[...arr1]} />
                </Col>

                <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                    <Array array={[...arr2]} />
                </Col>
            </>
        )

        // Set the amount of columns to display if Array is 6 or more
    } else if (arr.length >= 6 && firstHalf && secondHalf) {
        amount = 'md-2';
        console.log(`Amount: ${amount}`);

        //Split First in to 3 arrays
        const splitIndex = Math.ceil(firstHalf.length / 3);
        const arr1 = firstHalf.slice(0, splitIndex);
        const arr2 = firstHalf.slice(splitIndex, splitIndex * 2);
        const arr3 = firstHalf.slice(splitIndex * 2, arr.length);

        //Split Second in to 3 arrays
        const splitIndex2 = Math.ceil(secondHalf.length / 3);
        const arr4 = secondHalf.slice(0, splitIndex2);
        const arr5 = secondHalf.slice(splitIndex2, splitIndex2 * 2);
        const arr6 = secondHalf.slice(splitIndex2 * 2, arr.length);

        return (
            <Row id={key}>
                <h1>Four</h1>
                <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                    <Array array={[...arr1]} />
                </Col>

                <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                    <Array array={[...arr2]} />
                </Col>

                <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                    <Array array={[...arr3]} />
                </Col>

                <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                    <Array array={[...arr4]} />
                </Col>

                <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                    <Array array={[...arr5]} />
                </Col>

                <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                    <Array array={[...arr6]} />
                </Col>
            </Row>
        )

    } else if (arr.length <= 3) {
        amount = 'md-2';
        console.log(`Amount: ${amount}`);
    };
};

export default cut;