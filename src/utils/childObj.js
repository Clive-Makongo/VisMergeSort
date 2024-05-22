const addClickedObjFunc = () => {
    const parentElement = elementRef.current;
    const grandChildrenArr = [];


    if (parentElement && clicked) {
        console.log(`Parent Element: `, parentElement[0].childNodes);

        parentElement.forEach((child, index) => {
            let firstChild = child.childNodes[0];
            let secondChild = child.childNodes[1];

            console.log(`First Child ${index}: `, firstChild);
            console.log(`Second Child ${index}: `, secondChild);



            grandChildren[index] = { firstChild: firstChild.childNodes[0].childNodes[0].innerHTML, secondChild: secondChild.childNodes[0].childNodes[0].innerHTML }
            setGrandChildrenLoaded(true);
        });

        console.log(grandChildrenArr);


    };


};