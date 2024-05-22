useEffect(() => {
    if (elementRef.current.length > 0) {
        console.log(`Element Ref: `, elementRef.current);
        const parentElement = elementRef.current.forEach((el, index) => {
            console.log(`Parent Element: `, el);
            if (el.childNodes.length === 2) {
                const firstChild = el.childNodes[0];
                const secondChild = el.childNodes[1];
                console.log(`First Child[${index}]: `, firstChild);
                console.log(`Second Child[${index}]: `, secondChild);
                setChildren([secondChild]);
                console.log(`Children: `, children);
            } else if (el.childNodes.length === 1) {
                const childNodes = el.childNodes[0].childNodes;
                console.log(`Child Nodes Length: `, el.childNodes.length);
                // console.log(`Child Nodes[0]: `, childNodes[0]);
                // console.log(`Child Nodes[1]: `, childNodes[1]);
                setChildren(prevChildren => [
                    ...prevChildren,
                    firstChild,
                    secondChild
                ]);
                console.log(`Children: `, children);
            }
        });
        console.log(`Parent Element: `, parentElement);

    };

}, [elementsHtml]);

const target = (e) => {
    e.stopPropagation(); // Stop event propagation
    console.log('Target: ', e.target);
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'DIV' || e.target.tagName === 'H4') {
        setClicked(!clicked);
        console.log(`clicked: `, e.target.tagName);
        setClickedEl([e.target.innerText]);
        console.log(`Tag Name: `, clickedEl);
    }
};

const handleClick = (index) => {
    // Access the child nodes of the clicked element
    const parentElement = elementRef.current[index];
    if (parentElement && parentElement.childNodes.length === 2) {
        const firstChild = parentElement.childNodes[0];
        const secondChild = parentElement.childNodes[1];

        // console.log(`First child innerText:`, firstChild.innerText);
        // console.log(`Second child innerText:`, secondChild.innerText);

        // Perform any other actions needed with the child nodes here
    } else if (parentElement && parentElement.childNodes.length == 1) {
        const childNodes = parentElement.childNodes[0].childNodes;
        // console.log(`Child Nodes[0]: `, childNodes[0]);
        // console.log(`Child Nodes[1]: `, childNodes[1]);

        childNodes.forEach((child, idx) => {
            // console.log(`Child ${idx} innerText:`, child.innerText);                
        });
    } else {
        console.log('Parent element does not have exactly two child nodes');
    }
};




useEffect(() => {
    const parentElement = elementRef.current;
    console.log(`Parent Element: `, parentElement);
    if (parentElement) {
        const childNodes = parentElement.forEach((el, index) => {
            console.log(`Child Nodes: `, el.childNodes);
            el.childNodes.forEach((child, idx) => {
                child.childNodes.forEach((childNode, i) => {
                    console.log(`Grand Child Node${i}: `, childNode.childNodes[0]);
                });
            });
        });
        console.log(`Child Nodes: `, childNodes);


    }
})



useEffect(() => {
    // Select all elements with IDs matching the pattern
    const elements = document.querySelectorAll('[id^="id_6-child-row-"]');

    console.log('Elements:', elements);

    // Extract innerHTML of each element and store in an array
    const htmlArray = Array.from(elements, el => el.innerHTML);

    // Set the HTML content array to state
    setElementsHtml(htmlArray);

    // Store references to the elements
    elementRefs.current = elements;

    // Loop through each element and its child nodes
    elements.forEach((parentElement) => {
        console.log('Parent Element:', parentElement);
        const childNodes = parentElement.childNodes;

        childNodes.forEach((child) => {
            console.log('Child Nodes:', child.childNodes);
            child.childNodes.forEach((grandChild, i) => {
                if (grandChild.childNodes.length > 0) {
                    console.log(`Grand Child Node ${i}:`, grandChild.childNodes[0].innerText);
                }
            });
        });
    });
}, [props]);