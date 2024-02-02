class Person {
  static validate(person) {
    if (!person.name) throw new Error("name is required");
    if (!person.cpf) throw new Error("cpf is required");
  }

  static process(person) {
    this.validate(person);
    const personFormatted = this.format(person);
    this.save(personFormatted);
    return "ok";
  }

  static save(person) {
    if (!["cpf", "firstName", "lastName"].every((prop) => person[prop]))
      throw new Error(`cannot save invalid person: ${JSON.stringify(person)}`);

    console.log("registrado com sucesso!", person);
  }

  static format(person) {
    const [firstName, ...lastName] = person.name.split(" ");
    return {
      cpf: person.cpf.replace(/\D/g, ""),
      firstName,
      lastName: lastName.join(" "),
    };
  }
}

Person.process({ name: "Ze das couves", cpf: "123.456.789-00" });

export default Person;
