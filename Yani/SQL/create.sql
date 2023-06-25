IF OBJECT_ID('dbo.SMS', 'U') IS NOT NULL
    DROP TABLE dbo.SMS; 	
CREATE TABLE dbo.SMS (
    MessageId INT PRIMARY KEY NOT NULL,
    Cost decimal NOT NULL,
    Message VARCHAR(255) NOT NULL,
    Status byte NOT NULL,
    Sender VARCHAR(255) NOT NULL,
    CreatedDate DATETIME2(0) DEFAULT CURRENT_TIMESTAMP
);

IF OBJECT_ID('dbo.Logs', 'U') IS NOT NULL
    DROP TABLE dbo.Logs; 	
CREATE TABLE dbo.Logs (
    LogID INT IDENTITY(1,1) NOT NULL,
    Related VARCHAR(320) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Detail NVARCHAR(MAX) NOT NULL,
    CreatedDate DATETIME2(0) DEFAULT CURRENT_TIMESTAMP
); 

-- Create Settings States
IF OBJECT_ID('dbo.States', 'U') IS NOT NULL
    DROP TABLE States;
CREATE TABLE States (
    StateID int IDENTITY(1,1) NOT NULL,
    StateName varchar(255) NOT NULL,
    CONSTRAINT PK_States PRIMARY KEY (StateID),
    CONSTRAINT UQ_States_State UNIQUE (StateName)
);

-- Create Settings Cities
IF OBJECT_ID('dbo.Cities', 'U') IS NOT NULL
    DROP TABLE Cities;
CREATE TABLE Cities (
    CityID int IDENTITY(1,1) NOT NULL,
    CityName varchar(255) NOT NULL,
    StateID int NULL,
    CONSTRAINT PK_Cities PRIMARY KEY (CityID),
    CONSTRAINT FK_Cities_States FOREIGN KEY (StateID) REFERENCES States (StateID)
);
 
-- Create Settings table
IF OBJECT_ID('dbo.Settings', 'U') IS NOT NULL
    DROP TABLE Settings;
CREATE TABLE Settings (
  SettingID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name Nvarchar(50) NOT NULL,
  Content NVARCHAR(255) NOT NULL
);

-- Create Languages table
IF OBJECT_ID('dbo.Languages', 'U') IS NOT NULL
    DROP TABLE Languages;
CREATE TABLE Languages (
  LanguageID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(100) NOT NULL,
  Code NVARCHAR(10) NOT NULL
);

-- Create Users table
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
    DROP TABLE Users;
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL, 
    Gender BIT NOT NULL DEFAULT 0,
    ImageURL NVARCHAR(255),
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL
);

-- Create PaymentMethods table
IF OBJECT_ID('dbo.PaymentMethods', 'U') IS NOT NULL
    DROP TABLE PaymentMethods;
CREATE TABLE PaymentMethods (
    PaymentMethodID INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    Thumbnail NVARCHAR(255),
    PaymentMethodName NVARCHAR(50),
    PaymentMethodDetails NVARCHAR(255),
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
);
-- Create OrderStatuses table
IF OBJECT_ID('dbo.OrderStatuses', 'U') IS NOT NULL
    DROP TABLE OrderStatuses;
CREATE TABLE OrderStatuses (
    OrderStatusID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    OrderStatusName NVARCHAR(50),
    OrderStatusDescription NVARCHAR(255),
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
);

-- Create RefundStatuses table
IF OBJECT_ID('dbo.RefundStatuses', 'U') IS NOT NULL
    DROP TABLE RefundStatuses;
CREATE TABLE RefundStatuses (
    RefundStatusID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    RefundStatusName NVARCHAR(50),
    RefundStatusDescription NVARCHAR(255),
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
);

-- Create SupportTicketStatuses table
IF OBJECT_ID('dbo.SupportTicketStatuses', 'U') IS NOT NULL
    DROP TABLE SupportTicketStatuses;
CREATE TABLE SupportTicketStatuses (
    SupportTicketStatusID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    SupportTicketStatusName NVARCHAR(50),
    SupportTicketStatusDescription NVARCHAR(255),
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
);

-- Create LanguageTranslations table
IF OBJECT_ID('dbo.LanguageTranslations', 'U') IS NOT NULL
    DROP TABLE LanguageTranslations;
CREATE TABLE LanguageTranslations (
    LanguageTranslationID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    LanguageID INT NOT NULL,
    TranslationKey NVARCHAR(100) NOT NULL,
    TranslationValue TEXT NOT NULL,
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
  FOREIGN KEY (LanguageID) REFERENCES Languages(LanguageID)
);

-- Create a new table for user addresses
IF OBJECT_ID('dbo.UserAddresses', 'U') IS NOT NULL
    DROP TABLE UserAddresses;
CREATE TABLE UserAddresses (
    AddressID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    UserID INT NOT NULL,
    AddressLine1 NVARCHAR(255),
    AddressLine2 NVARCHAR(255),
    CityID INT NOT NULL,
    State NVARCHAR(50),
    Country NVARCHAR(50),
    PostalCode NVARCHAR(20),
    Phone NVARCHAR(20),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CityID) REFERENCES Cities(CityID)
);

-- Create a new table for user groups information
IF OBJECT_ID('dbo.UserGroups', 'U') IS NOT NULL
    DROP TABLE UserGroups;
CREATE TABLE UserGroups (
    UserGroupID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    GroupName NVARCHAR(50) UNIQUE,
    ListPermission NVARCHAR(MAX) NOT NULL DEFAULT '*',
    CreatedBy INT DEFAULT NULL, 
    RegistrationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastLoginDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP, 
);

INSERT INTO UserGroups (GroupName, ListPermission) VALUES ('Admin', '*');
INSERT INTO UserGroups (GroupName, ListPermission) VALUES ('User', '');

-- Create a new table for user login information
IF OBJECT_ID('dbo.UserLogin', 'U') IS NOT NULL
    DROP TABLE UserLogin;
CREATE TABLE UserLogin (
    LoginID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    UserID INT DEFAULT NULL,
    UserGroupID INT DEFAULT 2,
    Username NVARCHAR(50) UNIQUE,
    Email NVARCHAR(255) UNIQUE,
    Phone NVARCHAR(20) UNIQUE,
    PasswordHash NVARCHAR(255),
    PasswordResetToken NVARCHAR(255) DEFAULT NULL,
    PasswordResetTokenExpiry DATETIME DEFAULT NULL,
    IsEmailVerified BIT NOT NULL DEFAULT 0,
    IsAccountVerified BIT NOT NULL DEFAULT 0,
    TwoFactorEnabled BIT NOT NULL DEFAULT 0,
    TwoFactorSecretKey NVARCHAR(255) DEFAULT NULL,
    TwoFactorBackupCodes NVARCHAR(255) DEFAULT NULL,
    FailedLoginAttempts INT NOT NULL DEFAULT 0,
    IsLockedOut BIT NOT NULL DEFAULT 0,
    LastPasswordChangeDate DATETIME DEFAULT NULL,
    PasswordExpirationDate DATETIME DEFAULT NULL,
    PasswordHistory NVARCHAR(255) DEFAULT NULL,
    IsPasswordExpired BIT NOT NULL DEFAULT 0,
    CreatedBy INT DEFAULT NULL, 
    RegistrationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastLoginDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UserGroupID) REFERENCES UserGroups(UserGroupID),
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT CK_PasswordHistory CHECK(PasswordHistory IS NOT NULL OR PasswordExpirationDate IS NULL),
    CONSTRAINT CK_FailedLoginAttempts CHECK(FailedLoginAttempts >= 0),
    CONSTRAINT CK_PasswordExpirationDate CHECK(PasswordExpirationDate IS NULL OR PasswordExpirationDate > LastPasswordChangeDate),
    CONSTRAINT CK_TwoFactorBackupCodes CHECK(TwoFactorBackupCodes IS NULL OR LEN(TwoFactorBackupCodes) = 90)
);

-- Create Brand table
IF OBJECT_ID('dbo.Brand', 'U') IS NOT NULL
    DROP TABLE Brand;
CREATE TABLE Brand (
    BrandID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    BrandName NVARCHAR(50) NOT NULL,
    ImageURL NVARCHAR(255),
    CreatedBy INT DEFAULT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
);

-- Create ScentNote table
IF OBJECT_ID('dbo.ScentNote', 'U') IS NOT NULL
    DROP TABLE ScentNote;
CREATE TABLE ScentNote (
    ScentNoteID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    ScentNoteName NVARCHAR(50) NOT NULL,
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
);

-- Create Size table
IF OBJECT_ID('dbo.Size', 'U') IS NOT NULL
    DROP TABLE Size;
CREATE TABLE Size (
    SizeID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    SizeName NVARCHAR(50) NOT NULL,
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
);

-- Create Ingredient table
IF OBJECT_ID('dbo.Ingredient', 'U') IS NOT NULL
    DROP TABLE Ingredient;
CREATE TABLE Ingredient (
    IngredientID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    IngredientName NVARCHAR(50) NOT NULL,
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
);
 
-- Create Categories table
IF OBJECT_ID('dbo.Categories', 'U') IS NOT NULL
    DROP TABLE Categories;
CREATE TABLE Categories (
    CategoryID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    CategoryName NVARCHAR(50),
    Description NVARCHAR(255),
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
);

-- Create Subcategories table
IF OBJECT_ID('dbo.Subcategories', 'U') IS NOT NULL
    DROP TABLE Subcategories;
CREATE TABLE Subcategories (
    SubcategoryID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    SubcategoryName NVARCHAR(50),
    CategoryID INT NOT NULL,
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

-- Create Products table
IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL
    DROP TABLE Products;
CREATE TABLE Products (
    ProductID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    ProductName NVARCHAR(50),
    Description NVARCHAR(255),
    SubcategoryID INT NOT NULL,
    Price DECIMAL(10, 2),
    BrandID INT NOT NULL,
    ScentNoteID INT NOT NULL,
    SizeID INT NOT NULL,
    ImageURL NVARCHAR(255),
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
    FOREIGN KEY (BrandID) REFERENCES Brand(BrandID),
    FOREIGN KEY (ScentNoteID) REFERENCES ScentNote(ScentNoteID),
    FOREIGN KEY (SizeID) REFERENCES Size(SizeID),
    FOREIGN KEY (SubcategoryID) REFERENCES Subcategories(SubcategoryID),
    CONSTRAINT CK_Products_Price CHECK(Price >= 0)
);

-- Create Inventory table
IF OBJECT_ID('dbo.Inventory', 'U') IS NOT NULL
    DROP TABLE Inventory;
CREATE TABLE Inventory (
    ProductID INT NOT NULL PRIMARY KEY,
    Quantity INT DEFAULT 0,
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Create Coupons table
IF OBJECT_ID('dbo.Coupons', 'U') IS NOT NULL
    DROP TABLE Coupons;
CREATE TABLE Coupons (
    CouponID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    CouponCode NVARCHAR(20),
    DiscountPercent INT DEFAULT 0,
    MaxUses INT DEFAULT 0,
    Uses INT DEFAULT 0,
    StartDate DATETIME,
    EndDate DATETIME,
    AppliesToProducts BIT NOT NULL DEFAULT 0,
    AppliesToCategories BIT NOT NULL DEFAULT 0,
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
);

-- Create ProductIngredient table
IF OBJECT_ID('dbo.ProductIngredient', 'U') IS NOT NULL
    DROP TABLE ProductIngredient;
CREATE TABLE ProductIngredient (
    ProductID INT NOT NULL,
    IngredientID INT NOT NULL,
    PRIMARY KEY (ProductID, IngredientID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredient(IngredientID),
);

-- Create Carts table
IF OBJECT_ID('dbo.Carts', 'U') IS NOT NULL
    DROP TABLE Carts;
CREATE TABLE Carts (
    CartID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    UserID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create CartItems table
IF OBJECT_ID('dbo.CartItems', 'U') IS NOT NULL
    DROP TABLE CartItems;
CREATE TABLE CartItems (
    CartItemID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    CartID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (CartID) REFERENCES Carts(CartID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    CONSTRAINT CK_CartItems_Quantity CHECK(Quantity > 0)
);

-- Create Orders table
IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL
    DROP TABLE Orders;
CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    CouponID INT DEFAULT NULL,
    AddressID INT NOT NULL,
    UserID INT NOT NULL,
    PaymentMethodID INT NOT NULL,
    OrderDate DATETIME NOT NULL,
    TotalCost DECIMAL(10, 2) NOT NULL,
    OrderStatusID INT NOT NULL,
    TrackingNumber INT DEFAULT NULL,
    ShippedDate DATETIME,
    DeliveredDate DATETIME, 
    FOREIGN KEY (AddressID) REFERENCES UserAddresses(AddressID),
    FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethods(PaymentMethodID),
    FOREIGN KEY (OrderStatusID) REFERENCES OrderStatuses(OrderStatusID),
    FOREIGN KEY (CouponID) REFERENCES Coupons(CouponID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT CK_Orders_TotalCost CHECK(TotalCost >= 0)
);

-- Create OrderItems table
IF OBJECT_ID('dbo.OrderItems', 'U') IS NOT NULL
    DROP TABLE OrderItems;
CREATE TABLE OrderItems (
    OrderItemID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT DEFAULT 0,
    Price DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Create Refunds table
IF OBJECT_ID('dbo.Refunds', 'U') IS NOT NULL
    DROP TABLE Refunds;
CREATE TABLE Refunds (
    RefundID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    OrderID INT NOT NULL,
    RefundAmount DECIMAL(10, 2),
    RefundDate DATETIME,
    RefundStatusID INT NOT NULL,
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (RefundStatusID) REFERENCES RefundStatuses(RefundStatusID)
);

-- Create Reviews table
IF OBJECT_ID('dbo.Reviews', 'U') IS NOT NULL
    DROP TABLE Reviews;
CREATE TABLE Reviews (
  ReviewID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  ProductID INT NOT NULL,
  UserID INT NOT NULL,
  Rating TINYINT DEFAULT 5,
  Comment TEXT,
  IsApproved BIT NOT NULL DEFAULT 0,
  CONSTRAINT FK_Reviews_Products FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
  CONSTRAINT FK_Reviews_Users FOREIGN KEY (UserID) REFERENCES Users(UserID),
  CONSTRAINT CK_Reviews_Rating CHECK(Rating >= 1 AND Rating <= 5)
);

-- Create Blogs table
IF OBJECT_ID('dbo.Blogs', 'U') IS NOT NULL
    DROP TABLE Blogs;
CREATE TABLE Blogs (
  BlogID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Title NVARCHAR(255),
  Content TEXT,
  ReviewID INT NOT NULL,
  ImageURL NVARCHAR(255),
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
  CONSTRAINT FK_Blogs_Reviews FOREIGN KEY (ReviewID) REFERENCES Reviews(ReviewID)
);

-- Create SupportCategories table
IF OBJECT_ID('dbo.SupportCategories', 'U') IS NOT NULL
    DROP TABLE SupportCategories;
CREATE TABLE SupportCategories (
  CategoryID INT NOT NULL PRIMARY KEY,
  CategoryName NVARCHAR(255),
    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy INT DEFAULT NULL,
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID), 
);

-- Create SupportTickets table
IF OBJECT_ID('dbo.SupportTickets', 'U') IS NOT NULL
    DROP TABLE SupportTickets;
CREATE TABLE SupportTickets (
  TicketID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  UserID INT NOT NULL,
  AdminID INT NOT NULL,
  CategoryID INT NOT NULL,
  Subject NVARCHAR(255),
  Description NVARCHAR(1200),
  SupportTicketStatusID INT NOT NULL,
  Timestamp DATETIME,
  IsTicketOpen BIT NOT NULL DEFAULT 1,
  FOREIGN KEY (SupportTicketStatusID) REFERENCES SupportTicketStatuses(SupportTicketStatusID),
  CONSTRAINT FK_SupportTickets_Users FOREIGN KEY (UserID) REFERENCES Users(UserID),
  CONSTRAINT FK_SupportTickets_SupportCategories FOREIGN KEY (CategoryID) REFERENCES SupportCategories(CategoryID),
  CONSTRAINT FK_SupportTickets_Admins FOREIGN KEY (AdminID) REFERENCES Users(UserID),
  CONSTRAINT CK_SupportTickets_Timestamp CHECK(Timestamp <= GETDATE())
);

-- Create SupportMessages table
IF OBJECT_ID('dbo.SupportMessages', 'U') IS NOT NULL
    DROP TABLE SupportMessages;
CREATE TABLE SupportMessages (
  MessageID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  TicketID INT NOT NULL,
  UserID INT NOT NULL,
  Message NVARCHAR(1200),
  Timestamp DATETIME,
  CONSTRAINT FK_SupportMessages_Users FOREIGN KEY (UserID) REFERENCES Users(UserID),
  CONSTRAINT FK_SupportMessages_SupportTickets FOREIGN KEY (TicketID) REFERENCES SupportTickets(TicketID)
);

-- Create Attachments table
IF OBJECT_ID('dbo.Attachments', 'U') IS NOT NULL
    DROP TABLE Attachments;
CREATE TABLE Attachments (
    AttachmentID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Name VARCHAR(255), 
    Description VARCHAR(255),
    ContentType VARCHAR(50),
    Size INT,
    CreatedBy INT NOT NULL,
    UpdatedBy INT,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedDate DATETIME,
    Version INT,
    Status INT,
    Tags VARCHAR(255),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserID),
);
-- Create ProductAttachments table
IF OBJECT_ID('dbo.ProductAttachments', 'U') IS NOT NULL
    DROP TABLE ProductAttachments;
CREATE TABLE ProductAttachments (
    ProductID INT NOT NULL,
    AttachmentID INT NOT NULL,
    PRIMARY KEY (ProductID, AttachmentID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (AttachmentID) REFERENCES Attachments(AttachmentID)
);

-- Create ReviewAttachments table
IF OBJECT_ID('dbo.ReviewAttachments', 'U') IS NOT NULL
    DROP TABLE ReviewAttachments;
CREATE TABLE ReviewAttachments (
    ReviewID INT NOT NULL,
    AttachmentID INT NOT NULL,
    PRIMARY KEY (ReviewID, AttachmentID),
    FOREIGN KEY (ReviewID) REFERENCES Reviews(ReviewID),
    FOREIGN KEY (AttachmentID) REFERENCES Attachments(AttachmentID)
);

-- Create BlogAttachments table
IF OBJECT_ID('dbo.BlogAttachments', 'U') IS NOT NULL
    DROP TABLE BlogAttachments;
CREATE TABLE BlogAttachments (
    BlogID INT NOT NULL,
    AttachmentID INT NOT NULL,
    PRIMARY KEY (BlogID, AttachmentID),
    FOREIGN KEY (BlogID) REFERENCES Blogs(BlogID),
    FOREIGN KEY (AttachmentID) REFERENCES Attachments(AttachmentID)
);

-- Create WebsiteVisitors table
IF OBJECT_ID('dbo.WebsiteVisitors', 'U') IS NOT NULL
    DROP TABLE WebsiteVisitors;
CREATE TABLE WebsiteVisitors (
    VisitorID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    IPAddress NVARCHAR(50) NOT NULL,
    VisitDate DATETIME NOT NULL,
    PageVisited NVARCHAR(255) NOT NULL,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
-- Add indexes
CREATE INDEX idx_ProductAttachments_ProductID ON ProductAttachments(ProductID);
CREATE INDEX idx_ReviewAttachments_ReviewID ON ReviewAttachments(ReviewID);
CREATE INDEX idx_BlogAttachments_BlogID ON BlogAttachments(BlogID);

CREATE INDEX idx_CartItems_CartID ON CartItems(CartID);
CREATE INDEX idx_CartItems_ProductID ON CartItems(ProductID);
CREATE INDEX idx_Orders_UserID ON Orders(UserID);
CREATE INDEX idx_Orders_OrderStatusID ON Orders(OrderStatusID);
CREATE INDEX idx_OrderItems_OrderID ON OrderItems(OrderID);
CREATE INDEX idx_OrderItems_ProductID ON OrderItems(ProductID);
CREATE INDEX idx_SupportTickets_UserID ON SupportTickets(UserID);
CREATE INDEX idx_SupportTickets_CategoryID ON SupportTickets(CategoryID);
CREATE INDEX idx_SupportTickets_SupportTicketStatusID ON SupportTickets(SupportTicketStatusID);
CREATE INDEX idx_SupportMessages_TicketID ON SupportMessages(TicketID);
CREATE INDEX idx_UserAddresses_UserID ON UserAddresses(UserID);
CREATE INDEX idx_ProductIngredient_ProductID ON ProductIngredient(ProductID);
CREATE INDEX idx_ProductIngredient_IngredientID ON ProductIngredient(IngredientID);

INSERT INTO Settings VALUES ('system_name', 'Yani');
INSERT INTO Settings VALUES ('currency', 'IR');
INSERT INTO Settings VALUES ('timezone', 'Asia/Dhaka');
INSERT INTO Settings VALUES ('favicon', 'favicon.png');
INSERT INTO Settings VALUES ('tagline', 'E-Commerce');
INSERT INTO Settings VALUES ('address', '');
INSERT INTO Settings VALUES ('smtp_user', '');
INSERT INTO Settings VALUES ('smtp_pass', '');
INSERT INTO Settings VALUES ( 'language', 'persian');
INSERT INTO Settings VALUES ( 'copyright', 'Soroush');
INSERT INTO Settings VALUES ( 'copyright_url', 'https://time.ir');
INSERT INTO Settings VALUES ( 'item_purchase_code', '');
INSERT INTO Settings VALUES ( 'font', '''PT Sans'', sans-serif');
INSERT INTO Settings VALUES ( 'font_family', 'PT Sans');
INSERT INTO Settings VALUES ( 'font_src', 'https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
INSERT INTO Settings VALUES ( 'account_sid', '');
INSERT INTO Settings VALUES ( 'auth_token', '');
INSERT INTO Settings VALUES ( 'number', '');
INSERT INTO Settings VALUES ( 'smtp_host', '');


INSERT INTO States VALUES ('آذربایجان شرقی');
INSERT INTO States VALUES ('آذربایجان غربی');
INSERT INTO States VALUES ('اردبیل');
INSERT INTO States VALUES ('اصفهان');
INSERT INTO States VALUES ('البرز');
INSERT INTO States VALUES ('ایلام');
INSERT INTO States VALUES ('بوشهر');
INSERT INTO States VALUES ('تهران');
INSERT INTO States VALUES ('چهارمحال وبختیاری');
INSERT INTO States VALUES ('خراسان جنوبی');
INSERT INTO States VALUES ('خراسان رضوی');
INSERT INTO States VALUES ('خراسان شمالی');
INSERT INTO States VALUES ('خوزستان');
INSERT INTO States VALUES ('زنجان');
INSERT INTO States VALUES ('سمنان');
INSERT INTO States VALUES ('سیستان وبلوچستان');
INSERT INTO States VALUES ('فارس');
INSERT INTO States VALUES ('قزوین');
INSERT INTO States VALUES ('قم');
INSERT INTO States VALUES ('کردستان');
INSERT INTO States VALUES ('کرمان');
INSERT INTO States VALUES ('کرمانشاه');
INSERT INTO States VALUES ('کهگیلویه وبویراحمد');
INSERT INTO States VALUES ('گلستان');
INSERT INTO States VALUES ('گیلان');
INSERT INTO States VALUES ('لرستان');
INSERT INTO States VALUES ('مازندران');
INSERT INTO States VALUES ('مرکزی');
INSERT INTO States VALUES ('هرمزگان');
INSERT INTO States VALUES ('همدان');
INSERT INTO States VALUES ('یزد');

INSERT INTO Cities VALUES ('آبادان',13);
INSERT INTO Cities VALUES ('آباده',17);
INSERT INTO Cities VALUES ('آبدانان',6);
INSERT INTO Cities VALUES ('آبیک',18);
INSERT INTO Cities VALUES ('آذرشهر',1);
INSERT INTO Cities VALUES ('آرادان',15);
INSERT INTO Cities VALUES ('آران وبیدگل',4);
INSERT INTO Cities VALUES ('آزادشهر',24);
INSERT INTO Cities VALUES ('آستارا',25);
INSERT INTO Cities VALUES ('آستانه اشرفیه',25);
INSERT INTO Cities VALUES ('آشتیان',28);
INSERT INTO Cities VALUES ('آغاجاری',13);
INSERT INTO Cities VALUES ('آق قلا',24);
INSERT INTO Cities VALUES ('آمل',27);
INSERT INTO Cities VALUES ('آوج',18);
INSERT INTO Cities VALUES ('ابرکوه',31);
INSERT INTO Cities VALUES ('ابوموسی',29);
INSERT INTO Cities VALUES ('ابهر',14);
INSERT INTO Cities VALUES ('اراک',28);
INSERT INTO Cities VALUES ('اردبیل',3);
INSERT INTO Cities VALUES ('اردستان',4);
INSERT INTO Cities VALUES ('اردکان',31);
INSERT INTO Cities VALUES ('اردل',9);
INSERT INTO Cities VALUES ('ارزوییه',21);
INSERT INTO Cities VALUES ('ارسنجان',17);
INSERT INTO Cities VALUES ('ارومیه',2);
INSERT INTO Cities VALUES ('ازنا',26);
INSERT INTO Cities VALUES ('استهبان',17);
INSERT INTO Cities VALUES ('اسدآباد',30);
INSERT INTO Cities VALUES ('اسفراین',12);
INSERT INTO Cities VALUES ('اسکو',1);
INSERT INTO Cities VALUES ('اسلام آبادغرب',22);
INSERT INTO Cities VALUES ('اسلامشهر',8);
INSERT INTO Cities VALUES ('اشتهارد',5);
INSERT INTO Cities VALUES ('اشکذر',31);
INSERT INTO Cities VALUES ('اشنویه',2);
INSERT INTO Cities VALUES ('اصفهان',4);
INSERT INTO Cities VALUES ('اصلاندوز',3);
INSERT INTO Cities VALUES ('اقلید',17);
INSERT INTO Cities VALUES ('البرز',18);
INSERT INTO Cities VALUES ('الیگودرز',26);
INSERT INTO Cities VALUES ('املش',25);
INSERT INTO Cities VALUES ('امیدیه',13);
INSERT INTO Cities VALUES ('انار',21);
INSERT INTO Cities VALUES ('اندیکا',13);
INSERT INTO Cities VALUES ('اندیمشک',13);
INSERT INTO Cities VALUES ('اوز',17);
INSERT INTO Cities VALUES ('اهر',1);
INSERT INTO Cities VALUES ('اهواز',13);
INSERT INTO Cities VALUES ('ایجرود',14);
INSERT INTO Cities VALUES ('ایذه',13);
INSERT INTO Cities VALUES ('ایرانشهر',16);
INSERT INTO Cities VALUES ('ایلام',6);
INSERT INTO Cities VALUES ('ایوان',6);
INSERT INTO Cities VALUES ('بابل',27);
INSERT INTO Cities VALUES ('بابلسر',27);
INSERT INTO Cities VALUES ('باخرز',11);
INSERT INTO Cities VALUES ('باشت',23);
INSERT INTO Cities VALUES ('باغ ملک',13);
INSERT INTO Cities VALUES ('بافت',21);
INSERT INTO Cities VALUES ('بافق',31);
INSERT INTO Cities VALUES ('بانه',20);
INSERT INTO Cities VALUES ('باوی',13);
INSERT INTO Cities VALUES ('بجستان',11);
INSERT INTO Cities VALUES ('بجنورد',12);
INSERT INTO Cities VALUES ('بختگان',17);
INSERT INTO Cities VALUES ('بدره',6);
INSERT INTO Cities VALUES ('برخوار',4);
INSERT INTO Cities VALUES ('بردسکن',11);
INSERT INTO Cities VALUES ('بردسیر',21);
INSERT INTO Cities VALUES ('بروجرد',26);
INSERT INTO Cities VALUES ('بروجن',9);
INSERT INTO Cities VALUES ('بستان آباد',1);
INSERT INTO Cities VALUES ('بستک',29);
INSERT INTO Cities VALUES ('بشاگرد',29);
INSERT INTO Cities VALUES ('بشرویه',10);
INSERT INTO Cities VALUES ('بم',21);
INSERT INTO Cities VALUES ('بمپور',16);
INSERT INTO Cities VALUES ('بن',9);
INSERT INTO Cities VALUES ('بناب',1);
INSERT INTO Cities VALUES ('بندرانزلی',25);
INSERT INTO Cities VALUES ('بندرعباس',29);
INSERT INTO Cities VALUES ('بندرگز',24);
INSERT INTO Cities VALUES ('بندرلنگه',29);
INSERT INTO Cities VALUES ('بندرماهشهر',13);
INSERT INTO Cities VALUES ('بو یین و میاندشت',4);
INSERT INTO Cities VALUES ('بوانات',17);
INSERT INTO Cities VALUES ('بوشهر',7);
INSERT INTO Cities VALUES ('بوکان',2);
INSERT INTO Cities VALUES ('بویراحمد',23);
INSERT INTO Cities VALUES ('بویین زهرا',18);
INSERT INTO Cities VALUES ('بهاباد',31);
INSERT INTO Cities VALUES ('بهار',30);
INSERT INTO Cities VALUES ('بهارستان',8);
INSERT INTO Cities VALUES ('بهبهان',13);
INSERT INTO Cities VALUES ('بهشهر',27);
INSERT INTO Cities VALUES ('بهمیی',23);
INSERT INTO Cities VALUES ('بیجار',20);
INSERT INTO Cities VALUES ('بیرجند',10);
INSERT INTO Cities VALUES ('بیضا',17);
INSERT INTO Cities VALUES ('بیله سوار',3);
INSERT INTO Cities VALUES ('بینالود',11);
INSERT INTO Cities VALUES ('پارس آباد',3);
INSERT INTO Cities VALUES ('پارسیان',29);
INSERT INTO Cities VALUES ('پاسارگاد',17);
INSERT INTO Cities VALUES ('پاکدشت',8);
INSERT INTO Cities VALUES ('پاوه',22);
INSERT INTO Cities VALUES ('پردیس',8);
INSERT INTO Cities VALUES ('پلدختر',26);
INSERT INTO Cities VALUES ('پلدشت',2);
INSERT INTO Cities VALUES ('پیرانشهر',2);
INSERT INTO Cities VALUES ('پیشوا',8);
INSERT INTO Cities VALUES ('تاکستان',18);
INSERT INTO Cities VALUES ('تایباد',11);
INSERT INTO Cities VALUES ('تبریز',1);
INSERT INTO Cities VALUES ('تربت جام',11);
INSERT INTO Cities VALUES ('تربت حیدریه',11);
INSERT INTO Cities VALUES ('ترکمن',24);
INSERT INTO Cities VALUES ('تفت',31);
INSERT INTO Cities VALUES ('تفتان',16);
INSERT INTO Cities VALUES ('تفرش',28);
INSERT INTO Cities VALUES ('تکاب',2);
INSERT INTO Cities VALUES ('تنکابن',27);
INSERT INTO Cities VALUES ('تنگستان',7);
INSERT INTO Cities VALUES ('تویسرکان',30);
INSERT INTO Cities VALUES ('تهران',8);
INSERT INTO Cities VALUES ('تیران وکرون',4);
INSERT INTO Cities VALUES ('ثلاث باباجانی',22);
INSERT INTO Cities VALUES ('جاجرم',12);
INSERT INTO Cities VALUES ('جاسک',29);
INSERT INTO Cities VALUES ('جغتای',11);
INSERT INTO Cities VALUES ('جلفا',1);
INSERT INTO Cities VALUES ('جم',7);
INSERT INTO Cities VALUES ('جوانرود',22);
INSERT INTO Cities VALUES ('جویبار',27);
INSERT INTO Cities VALUES ('جوین',11);
INSERT INTO Cities VALUES ('جهرم',17);
INSERT INTO Cities VALUES ('جیرفت',21);
INSERT INTO Cities VALUES ('چادگان',4);
INSERT INTO Cities VALUES ('چاراویماق',1);
INSERT INTO Cities VALUES ('چالدران',2);
INSERT INTO Cities VALUES ('چالوس',27);
INSERT INTO Cities VALUES ('چاه بهار',16);
INSERT INTO Cities VALUES ('چایپاره',2);
INSERT INTO Cities VALUES ('چرام',23);
INSERT INTO Cities VALUES ('چرداول',6);
INSERT INTO Cities VALUES ('چگنی',26);
INSERT INTO Cities VALUES ('چناران',11);
INSERT INTO Cities VALUES ('حاجی اباد',29);
INSERT INTO Cities VALUES ('حمیدیه',13);
INSERT INTO Cities VALUES ('خاتم',31);
INSERT INTO Cities VALUES ('خاش',16);
INSERT INTO Cities VALUES ('خانمیرزا',9);
INSERT INTO Cities VALUES ('خداآفرین',1);
INSERT INTO Cities VALUES ('خدابنده',14);
INSERT INTO Cities VALUES ('خرامه',17);
INSERT INTO Cities VALUES ('خرم آباد',26);
INSERT INTO Cities VALUES ('خرم بید',17);
INSERT INTO Cities VALUES ('خرمدره',14);
INSERT INTO Cities VALUES ('خرمشهر',13);
INSERT INTO Cities VALUES ('خفر',17);
INSERT INTO Cities VALUES ('خلخال',3);
INSERT INTO Cities VALUES ('خلیل آباد',11);
INSERT INTO Cities VALUES ('خمیر',29);
INSERT INTO Cities VALUES ('خمین',28);
INSERT INTO Cities VALUES ('خمینی شهر',4);
INSERT INTO Cities VALUES ('خنج',17);
INSERT INTO Cities VALUES ('خنداب',28);
INSERT INTO Cities VALUES ('خواف',11);
INSERT INTO Cities VALUES ('خوانسار',4);
INSERT INTO Cities VALUES ('خور و بیابانک',4);
INSERT INTO Cities VALUES ('خوسف',10);
INSERT INTO Cities VALUES ('خوشاب',11);
INSERT INTO Cities VALUES ('خوی',2);
INSERT INTO Cities VALUES ('داراب',17);
INSERT INTO Cities VALUES ('دالاهو',22);
INSERT INTO Cities VALUES ('دامغان',15);
INSERT INTO Cities VALUES ('داورزن',11);
INSERT INTO Cities VALUES ('درگز',11);
INSERT INTO Cities VALUES ('درگزین',30);
INSERT INTO Cities VALUES ('درمیان',10);
INSERT INTO Cities VALUES ('دره شهر',6);
INSERT INTO Cities VALUES ('دزفول',13);
INSERT INTO Cities VALUES ('دشت آزادگان',13);
INSERT INTO Cities VALUES ('دشتستان',7);
INSERT INTO Cities VALUES ('دشتی',7);
INSERT INTO Cities VALUES ('دشتیاری',16);
INSERT INTO Cities VALUES ('دلفان',26);
INSERT INTO Cities VALUES ('دلگان',16);
INSERT INTO Cities VALUES ('دلیجان',28);
INSERT INTO Cities VALUES ('دماوند',8);
INSERT INTO Cities VALUES ('دنا',23);
INSERT INTO Cities VALUES ('دورود',26);
INSERT INTO Cities VALUES ('دهاقان',4);
INSERT INTO Cities VALUES ('دهگلان',20);
INSERT INTO Cities VALUES ('دهلران',6);
INSERT INTO Cities VALUES ('دیر',7);
INSERT INTO Cities VALUES ('دیلم',7);
INSERT INTO Cities VALUES ('دیواندره',20);
INSERT INTO Cities VALUES ('رابر',21);
INSERT INTO Cities VALUES ('راز و جرگلان',12);
INSERT INTO Cities VALUES ('راسک',16);
INSERT INTO Cities VALUES ('رامسر',27);
INSERT INTO Cities VALUES ('رامشیر',13);
INSERT INTO Cities VALUES ('رامهرمز',13);
INSERT INTO Cities VALUES ('رامیان',24);
INSERT INTO Cities VALUES ('راور',21);
INSERT INTO Cities VALUES ('رباط کریم',8);
INSERT INTO Cities VALUES ('رزن',30);
INSERT INTO Cities VALUES ('رستم',17);
INSERT INTO Cities VALUES ('رشت',25);
INSERT INTO Cities VALUES ('رشتخوار',11);
INSERT INTO Cities VALUES ('رضوانشهر',25);
INSERT INTO Cities VALUES ('رفسنجان',21);
INSERT INTO Cities VALUES ('روانسر',22);
INSERT INTO Cities VALUES ('رودان',29);
INSERT INTO Cities VALUES ('رودبار',25);
INSERT INTO Cities VALUES ('رودبارجنوب',21);
INSERT INTO Cities VALUES ('رودسر',25);
INSERT INTO Cities VALUES ('رومشکان',26);
INSERT INTO Cities VALUES ('ری',8);
INSERT INTO Cities VALUES ('ریگان',21);
INSERT INTO Cities VALUES ('زابل',16);
INSERT INTO Cities VALUES ('زاوه',11);
INSERT INTO Cities VALUES ('زاهدان',16);
INSERT INTO Cities VALUES ('زرقان',17);
INSERT INTO Cities VALUES ('زرند',21);
INSERT INTO Cities VALUES ('زرندیه',28);
INSERT INTO Cities VALUES ('زرین دشت',17);
INSERT INTO Cities VALUES ('زنجان',14);
INSERT INTO Cities VALUES ('زهک',16);
INSERT INTO Cities VALUES ('زیرکوه',10);
INSERT INTO Cities VALUES ('ساری',27);
INSERT INTO Cities VALUES ('سامان',9);
INSERT INTO Cities VALUES ('ساوجبلاغ',5);
INSERT INTO Cities VALUES ('ساوه',28);
INSERT INTO Cities VALUES ('سبزوار',11);
INSERT INTO Cities VALUES ('سپیدان',17);
INSERT INTO Cities VALUES ('سراب',1);
INSERT INTO Cities VALUES ('سراوان',16);
INSERT INTO Cities VALUES ('سرایان',10);
INSERT INTO Cities VALUES ('سرباز',16);
INSERT INTO Cities VALUES ('سربیشه',10);
INSERT INTO Cities VALUES ('سرپل ذهاب',22);
INSERT INTO Cities VALUES ('سرچهان',17);
INSERT INTO Cities VALUES ('سرخس',11);
INSERT INTO Cities VALUES ('سرخه',15);
INSERT INTO Cities VALUES ('سردشت',2);
INSERT INTO Cities VALUES ('سرعین',3);
INSERT INTO Cities VALUES ('سروآباد',20);
INSERT INTO Cities VALUES ('سروستان',17);
INSERT INTO Cities VALUES ('سقز',20);
INSERT INTO Cities VALUES ('سلسله',26);
INSERT INTO Cities VALUES ('سلطانیه',14);
INSERT INTO Cities VALUES ('سلماس',2);
INSERT INTO Cities VALUES ('سمنان',15);
INSERT INTO Cities VALUES ('سمیرم',4);
INSERT INTO Cities VALUES ('سنقر',22);
INSERT INTO Cities VALUES ('سنندج',20);
INSERT INTO Cities VALUES ('سوادکوه',27);
INSERT INTO Cities VALUES ('سوادکوه شمالی',27);
INSERT INTO Cities VALUES ('سیاهکل',25);
INSERT INTO Cities VALUES ('سیب و سوران',16);
INSERT INTO Cities VALUES ('سیرجان',21);
INSERT INTO Cities VALUES ('سیروان',6);
INSERT INTO Cities VALUES ('سیریک',29);
INSERT INTO Cities VALUES ('سیمرغ',27);
INSERT INTO Cities VALUES ('شادگان',13);
INSERT INTO Cities VALUES ('شازند',28);
INSERT INTO Cities VALUES ('شاهرود',15);
INSERT INTO Cities VALUES ('شاهین دژ',2);
INSERT INTO Cities VALUES ('شاهین شهرومیمه',4);
INSERT INTO Cities VALUES ('شبستر',1);
INSERT INTO Cities VALUES ('شفت',25);
INSERT INTO Cities VALUES ('شمیرانات',8);
INSERT INTO Cities VALUES ('شوش',13);
INSERT INTO Cities VALUES ('شوشتر',13);
INSERT INTO Cities VALUES ('شوط',2);
INSERT INTO Cities VALUES ('شهربابک',21);
INSERT INTO Cities VALUES ('شهرضا',4);
INSERT INTO Cities VALUES ('شهرکرد',9);
INSERT INTO Cities VALUES ('شهریار',8);
INSERT INTO Cities VALUES ('شیراز',17);
INSERT INTO Cities VALUES ('شیروان',12);
INSERT INTO Cities VALUES ('صالح آباد',11);
INSERT INTO Cities VALUES ('صحنه',22);
INSERT INTO Cities VALUES ('صومعه سرا',25);
INSERT INTO Cities VALUES ('طارم',14);
INSERT INTO Cities VALUES ('طالقان',5);
INSERT INTO Cities VALUES ('طبس',10);
INSERT INTO Cities VALUES ('طوالش',25);
INSERT INTO Cities VALUES ('عباس آباد',27);
INSERT INTO Cities VALUES ('عجب شیر',1);
INSERT INTO Cities VALUES ('عسلویه',7);
INSERT INTO Cities VALUES ('علی آباد کتول',24);
INSERT INTO Cities VALUES ('عنبرآباد',21);
INSERT INTO Cities VALUES ('فارسان',9);
INSERT INTO Cities VALUES ('فاروج',12);
INSERT INTO Cities VALUES ('فاریاب',21);
INSERT INTO Cities VALUES ('فامنین',30);
INSERT INTO Cities VALUES ('فراشبند',17);
INSERT INTO Cities VALUES ('فراهان',28);
INSERT INTO Cities VALUES ('فردوس',10);
INSERT INTO Cities VALUES ('فردیس',5);
INSERT INTO Cities VALUES ('فریدن',4);
INSERT INTO Cities VALUES ('فریدونشهر',4);
INSERT INTO Cities VALUES ('فریدونکنار',27);
INSERT INTO Cities VALUES ('فریمان',11);
INSERT INTO Cities VALUES ('فسا',17);
INSERT INTO Cities VALUES ('فلاورجان',4);
INSERT INTO Cities VALUES ('فنوج',16);
INSERT INTO Cities VALUES ('فومن',25);
INSERT INTO Cities VALUES ('فهرج',21);
INSERT INTO Cities VALUES ('فیروزآباد',17);
INSERT INTO Cities VALUES ('فیروزکوه',8);
INSERT INTO Cities VALUES ('فیروزه',11);
INSERT INTO Cities VALUES ('قایم شهر',27);
INSERT INTO Cities VALUES ('قاینات',10);
INSERT INTO Cities VALUES ('قدس',8);
INSERT INTO Cities VALUES ('قرچک',8);
INSERT INTO Cities VALUES ('قروه',20);
INSERT INTO Cities VALUES ('قزوین',18);
INSERT INTO Cities VALUES ('قشم',29);
INSERT INTO Cities VALUES ('قصرشیرین',22);
INSERT INTO Cities VALUES ('قصرقند',16);
INSERT INTO Cities VALUES ('قلعه گنج',21);
INSERT INTO Cities VALUES ('قم',19);
INSERT INTO Cities VALUES ('قوچان',11);
INSERT INTO Cities VALUES ('قیروکارزین',17);
INSERT INTO Cities VALUES ('کارون',13);
INSERT INTO Cities VALUES ('کازرون',17);
INSERT INTO Cities VALUES ('کاشان',4);
INSERT INTO Cities VALUES ('کاشمر',11);
INSERT INTO Cities VALUES ('کامیاران',20);
INSERT INTO Cities VALUES ('کبودرآهنگ',30);
INSERT INTO Cities VALUES ('کرج',5);
INSERT INTO Cities VALUES ('کردکوی',24);
INSERT INTO Cities VALUES ('کرمان',21);
INSERT INTO Cities VALUES ('کرمانشاه',22);
INSERT INTO Cities VALUES ('کلات',11);
INSERT INTO Cities VALUES ('کلاردشت',27);
INSERT INTO Cities VALUES ('کلاله',24);
INSERT INTO Cities VALUES ('کلیبر',1);
INSERT INTO Cities VALUES ('کمیجان',28);
INSERT INTO Cities VALUES ('کنارک',16);
INSERT INTO Cities VALUES ('کنگان',7);
INSERT INTO Cities VALUES ('کنگاور',22);
INSERT INTO Cities VALUES ('کوار',17);
INSERT INTO Cities VALUES ('کوثر',3);
INSERT INTO Cities VALUES ('کوه چنار',17);
INSERT INTO Cities VALUES ('کوهبنان',21);
INSERT INTO Cities VALUES ('کوهدشت',26);
INSERT INTO Cities VALUES ('کوهرنگ',9);
INSERT INTO Cities VALUES ('کوهسرخ',11);
INSERT INTO Cities VALUES ('کهگیلویه',23);
INSERT INTO Cities VALUES ('کهنوج',21);
INSERT INTO Cities VALUES ('کیار',9);
INSERT INTO Cities VALUES ('گالیکش',24);
INSERT INTO Cities VALUES ('گتوند',13);
INSERT INTO Cities VALUES ('گچساران',23);
INSERT INTO Cities VALUES ('گراش',17);
INSERT INTO Cities VALUES ('گرگان',24);
INSERT INTO Cities VALUES ('گرمسار',15);
INSERT INTO Cities VALUES ('گرمه',12);
INSERT INTO Cities VALUES ('گرمی',3);
INSERT INTO Cities VALUES ('گلپایگان',4);
INSERT INTO Cities VALUES ('گلوگاه',27);
INSERT INTO Cities VALUES ('گمیشان',24);
INSERT INTO Cities VALUES ('گناباد',11);
INSERT INTO Cities VALUES ('گناوه',7);
INSERT INTO Cities VALUES ('گنبدکاووس',24);
INSERT INTO Cities VALUES ('گیلانغرب',22);
INSERT INTO Cities VALUES ('لارستان',17);
INSERT INTO Cities VALUES ('لالی',13);
INSERT INTO Cities VALUES ('لامرد',17);
INSERT INTO Cities VALUES ('لاهیجان',25);
INSERT INTO Cities VALUES ('لردگان',9);
INSERT INTO Cities VALUES ('لنجان',4);
INSERT INTO Cities VALUES ('لنده',23);
INSERT INTO Cities VALUES ('لنگرود',25);
INSERT INTO Cities VALUES ('مارگون',23);
INSERT INTO Cities VALUES ('ماسال',25);
INSERT INTO Cities VALUES ('ماکو',2);
INSERT INTO Cities VALUES ('مانه وسملقان',12);
INSERT INTO Cities VALUES ('ماهنشان',14);
INSERT INTO Cities VALUES ('مبارکه',4);
INSERT INTO Cities VALUES ('محلات',28);
INSERT INTO Cities VALUES ('محمودآباد',27);
INSERT INTO Cities VALUES ('مراغه',1);
INSERT INTO Cities VALUES ('مراوه تپه',24);
INSERT INTO Cities VALUES ('مرند',1);
INSERT INTO Cities VALUES ('مرودشت',17);
INSERT INTO Cities VALUES ('مریوان',20);
INSERT INTO Cities VALUES ('مسجدسلیمان',13);
INSERT INTO Cities VALUES ('مشگین شهر',3);
INSERT INTO Cities VALUES ('مشهد',11);
INSERT INTO Cities VALUES ('ملارد',8);
INSERT INTO Cities VALUES ('ملایر',30);
INSERT INTO Cities VALUES ('ملکان',1);
INSERT INTO Cities VALUES ('ملکشاهی',6);
INSERT INTO Cities VALUES ('ممسنی',17);
INSERT INTO Cities VALUES ('منوجان',21);
INSERT INTO Cities VALUES ('مه ولات',11);
INSERT INTO Cities VALUES ('مهاباد',2);
INSERT INTO Cities VALUES ('مهدی شهر',15);
INSERT INTO Cities VALUES ('مهر',17);
INSERT INTO Cities VALUES ('مهران',6);
INSERT INTO Cities VALUES ('مهرستان',16);
INSERT INTO Cities VALUES ('مهریز',31);
INSERT INTO Cities VALUES ('میامی',15);
INSERT INTO Cities VALUES ('میاندوآب',2);
INSERT INTO Cities VALUES ('میاندورود',27);
INSERT INTO Cities VALUES ('میانه',1);
INSERT INTO Cities VALUES ('میبد',31);
INSERT INTO Cities VALUES ('میرجاوه',16);
INSERT INTO Cities VALUES ('میناب',29);
INSERT INTO Cities VALUES ('مینودشت',24);
INSERT INTO Cities VALUES ('نایین',4);
INSERT INTO Cities VALUES ('نجف آباد',4);
INSERT INTO Cities VALUES ('نرماشیر',21);
INSERT INTO Cities VALUES ('نطنز',4);
INSERT INTO Cities VALUES ('نظرآباد',5);
INSERT INTO Cities VALUES ('نقده',2);
INSERT INTO Cities VALUES ('نکا',27);
INSERT INTO Cities VALUES ('نمین',3);
INSERT INTO Cities VALUES ('نور',27);
INSERT INTO Cities VALUES ('نوشهر',27);
INSERT INTO Cities VALUES ('نهاوند',30);
INSERT INTO Cities VALUES ('نهبندان',10);
INSERT INTO Cities VALUES ('نی ریز',17);
INSERT INTO Cities VALUES ('نیر',3);
INSERT INTO Cities VALUES ('نیشابور',11);
INSERT INTO Cities VALUES ('نیک شهر',16);
INSERT INTO Cities VALUES ('نیمروز',16);
INSERT INTO Cities VALUES ('ورامین',8);
INSERT INTO Cities VALUES ('ورزقان',1);
INSERT INTO Cities VALUES ('هامون',16);
INSERT INTO Cities VALUES ('هرسین',22);
INSERT INTO Cities VALUES ('هریس',1);
INSERT INTO Cities VALUES ('هشترود',1);
INSERT INTO Cities VALUES ('هفتکل',13);
INSERT INTO Cities VALUES ('هلیلان',6);
INSERT INTO Cities VALUES ('همدان',30);
INSERT INTO Cities VALUES ('هندیجان',13);
INSERT INTO Cities VALUES ('هوراند',1);
INSERT INTO Cities VALUES ('هویزه',13);
INSERT INTO Cities VALUES ('هیرمند',16);
INSERT INTO Cities VALUES ('یزد',31); 