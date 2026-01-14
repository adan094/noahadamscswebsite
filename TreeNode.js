

 //Tree Node class that holds data for differentiating cars via attributes
export default class TreeNode {


  constructor(value, item, carsMatching=1) {
    this.value = value;
    //the root does not have any matching items, otherwise hold the items so that you can check them later
    if(item!=null)
      this.matchingItems = [item];
    this.carsMatching = carsMatching; //gets number of items matching this node (and thus its path of attribute options)
    this.children = []; //gets child nodes with further attributes used to differentiate options
    this.leaf=true;     //holds whether or not there is only one value item held by this node and thus no further attributes need to be checked.
  }

  

  addChild(item) {
    this.children.push(item);
  }

  //iterates matchingCount and adds match
  addCarsMatching (item) {
    this.carsMatching += 1;
    this.matchingItems.push(item);
  }

  getCarsMatching () {  
    return this.carsMatching;
  }

  //finds the child and adds the match, while making sure that it is no longer considered a leaf
  addMatch(childValue, item) {
    const child = this.children.find(child => child.value === childValue);
    child.addCarsMatching(item); 
    child.falsifyLeaf();
  }

  //checks if there is already a child with this attribute value
  childExists(value) {
    return this.children.some(child => child.value === value);
  }

  getChild(value) {
    return this.children.find(child => child.value === value);
  }

  getLeaf()
  {
    return this.leaf;
  }

  getValue()
  {
    return this.value;
  }

  verifyLeaf()
  {
    this.leaf=true;
  }

  falsifyLeaf()
  {
    this.leaf=false;
  }

getChildren()
{
    return this.children;
}

  childList()
  {
    return JSON.stringify(this.children);
  }

  getMatches()
  {
    return this.matchingItems;
  }

  clone() 
  {
  const copy = new TreeNode(this.value, this.data, this.size);
  copy.leaf = this.leaf;
  copy.matches = Array.isArray(this.matches) ? this.matches.slice() : [];
  copy.children = this.children.map(child => child.clone());
  return copy;
}


}