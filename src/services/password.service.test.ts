import { PasswordService } from "../services/password.service";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("PasswordService", () => {
  let password: string;
  let hashedPassword: string;

  beforeEach(() => {
    password = "123456";
    hashedPassword = "hashedPassword123456";

    (bcrypt.genSalt as jest.Mock).mockResolvedValue("salt");
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("hashPassword", () => {
    it("should hash a password", async () => {
      const result = await PasswordService.hashPassword(password);

      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(password, "salt");
      expect(result).toBe(hashedPassword);
    });
  });

  describe("comparePasswords", () => {
    it("should compare a password with a hashed password", async () => {
      const isValid = await PasswordService.comparePasswords(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(isValid).toBe(true);
    });
  });
});
