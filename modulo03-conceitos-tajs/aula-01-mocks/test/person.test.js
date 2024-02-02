import { it, describe, expect, jest } from "@jest/globals";
import Person from "../src/person.js";

describe("#Person suite", () => {
  describe("#validate", () => {
    it("should throw error if the name isn't present", () => {
      const mockInvalidPerson = {
        name: "",
        cpf: "123.456.789-00",
      };
      expect(() => Person.validate(mockInvalidPerson)).toThrowError(
        "name is required"
      );
    });

    it("should throw error if the cpf isn't present", () => {
      const mockInvalidPerson = {
        name: "Ze das couves",
        cpf: "",
      };
      expect(() => Person.validate(mockInvalidPerson)).toThrowError(
        "cpf is required"
      );
    });

    it("should not throw error if person is valid", () => {
      const mockInvalidPerson = {
        name: "Ze das couves",
        cpf: "123.456.789-00",
      };
      expect(() => Person.validate(mockInvalidPerson)).not.toThrow();
    });
  });
  describe("#format", () => {
    it("should format person name and cpf", () => {
      // AAA

      // Arrange - Preparar
      const mockPerson = {
        name: "Zé das couves",
        cpf: "123.456.789-00",
      };

      // Act - Executar
      const result = Person.format(mockPerson);

      // Assert - Validar
      expect(result).toStrictEqual({
        firstName: "Zé",
        lastName: "das couves",
        cpf: "12345678900",
      });
    });
  });
  describe("#process", () => {
    const mockPerson = {
      name: "Zezin da silva",
      cpf: "123.456.789-00",
    };

    it("should process a valid person", () => {
      jest.spyOn(Person, Person.validate.name).mockReturnValue();
      jest.spyOn(Person, Person.format.name).mockReturnValue({
        cpf: "12345678900",
        firstName: "Zezin",
        lastName: "da silva",
      });

      const result = Person.process(mockPerson);

      expect(result).toBe("ok");
    });
  });
});
