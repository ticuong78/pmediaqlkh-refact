import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Starts of Enum
export const Gender = pgEnum("gender", ["MALE", "FEMAILE", "OTHER"]);
export const UserRole = pgEnum("user_role", ["ADMIN", "USER"]);
export const CustomerType = pgEnum("customer_type", ["INDIVIDUAL", "BUSINESS"]); // cá nhân, doanh nghiệp
export const CustomerLevel = pgEnum("customer_level", [
  "NORMAL",
  "VIP",
  "PREMIUM",
]);
export const CustomerStatus = pgEnum("customer_status", [
  "ACTIVE",
  "INACTIVE",
  "POTENTIAL",
  "SUSPENDED",
]);
// End of Enum

export const User = pgTable("user", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(), // thông tin cho khách hàng và thông tin đăng nhập cho tài khoản
  password: text("password").notNull(), // thông tin cho khách hàng
  displayName: text("display_name").notNull(), // tên hiển thị khi đăng nhập vào web
  role: UserRole("role").notNull().default("USER"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  customerId: integer("customer_id").references(() => Customer.id),
});

// khách hàng có thể là doanh nghiệp hoặc cá nhân
// Lưu ý: với doanh nghiệp, phải có thông tin của người đại diện doanh nghiệp
export const Customer = pgTable("customer", {
  id: serial("id").primaryKey(), // để nhận biết thông qua nội bộ hoặc hệ thống
  code: text("code").unique().notNull(), // để nhận biết thông qua khác hàng này với khách hàng kia
  name: text("name").unique().notNull(), // tên thật khách hàng
  type: CustomerType("type").default("INDIVIDUAL").notNull(),
  level: CustomerLevel("level").default("NORMAL").notNull(),
  status: CustomerStatus("status").notNull().default("ACTIVE"),

  // thông tin cá nhân của khách hàng
  taxCode: text("tax_code"),
  businessType: text("business_type"),
  website: text("website"), // website cá nhân
  gender: Gender("gender"),
  dateOfBirth: timestamp("date_of_birth"),
  source: text("source"),

  // thông tin người đại diện nếu là doanh nghiệp
  representor: text("representor"),
  representorPosition: text("representor_position"),

  // thông tin liên hệ chính
  email: text("email"),
  phone: text("phone"),
  address: text("address"),

  // thông tin liên hệ bổ sung
  // technicalEmail   String? // Email kỹ thuật
  // technicalPhone   String? // Số điện thoại kỹ thuật
  // technicalContact String? // Người liên hệ kỹ thuật
  // billingEmail     String? // Email thanh toán
  // billingPhone     String? // Số điện thoại thanh toán
  // billingContact   String? // Người liên hệ thanh toán
  // billingAddress   String? // Địa chỉ thanh toán
  technicalEmail: text("technical_email"),
  technicalPhone: text("technical_phone"),
  technicalContact: text("technical_contact"),
  billingEmail: text("billing_email"),
  billingPhone: text("billing_phone"),
  billingContact: text("billing_contact"),
  billingAddress: text("billing_address"),

  // phân loại và khu vực
  region: text("region"),
  tags: text("tags"),
});
