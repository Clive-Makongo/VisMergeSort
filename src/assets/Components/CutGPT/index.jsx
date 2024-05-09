import Col from "../Column";
import Array from "../Array";

const render = (arr) => {
    const cutGPT = (arr) => {
        // Set the amount of columns to display
        let amount = 'md-2';

        if (arr.length >= 12) {
            amount = 'md-6';
            const splitIndex = Math.ceil(arr.length / 2);
            const arr1 = arr.slice(0, splitIndex);
            const arr2 = arr.slice(splitIndex);
            return renderArrays([arr1, arr2]);
        } else if (arr.length >= 6) {
            amount = 'md-2';
            const splitArr = splitArray(arr, 3);
            return renderArrays(splitArr);
        }

        // If the array length is less than or equal to 3, render the array directly
        return renderArrays([arr]);
    };

    // Helper function to split array into multiple arrays
    const splitArray = (arr, numChunks) => {
        const chunkSize = Math.ceil(arr.length / numChunks);
        const result = [];
        for (let i = 0; i < numChunks; i++) {
            console.log(`i: ${i}, chunkSize: ${chunkSize} result: ${result}`);
            result.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
        }
        return result;
    };

    // Helper function to render arrays
    const renderArrays = (arrays) => {

        console.log(`Arrays: ${arrays}`)
        return arrays.map((subArray, index) => (
            <>
                <p>{subArray}</p>
                <Col key={index} style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size="md-6">
                    <Array array={[...subArray]} />

                    {console.log(`SubArray: ${subArray} Index: ${index}`)}
                </Col>
            </>
        ));
    };


    cutGPT(arr);
};

export default render;