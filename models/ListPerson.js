class ListPerson{
    constructor(){
        this.personList = [];
    }
 
    addPerson(person) {
        this.personList.push(person);
       
        
      }
    xoaUser(ma) {
        this.personList = this.personList.filter((person) => person.ma !== ma);
      };
    editPerson(id, data){
        const index = this.personList.findIndex((person) => person.id === id);
      if (index) {
        Object.assign(index, data);
      }
    } ;
   
 
}
export default ListPerson