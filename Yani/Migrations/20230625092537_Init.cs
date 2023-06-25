using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Yani.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    LanguageID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Language__B938558BA0DE9954", x => x.LanguageID);
                });

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    LogID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Related = table.Column<string>(type: "varchar(320)", unicode: false, maxLength: 320, nullable: false),
                    Title = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Detail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Logs__5E5499A8E79F50BA", x => x.LogID);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    SettingID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Settings__54372AFD005779E4", x => x.SettingID);
                });

            migrationBuilder.CreateTable(
                name: "SMS",
                columns: table => new
                {
                    MessageId = table.Column<int>(type: "int", nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(18,3)", nullable: false),
                    Message = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Status = table.Column<byte>(type: "tinyint", nullable: false),
                    Sender = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SMS__C87C0C9C8773DDD3", x => x.MessageId);
                });

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    StateID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StateName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_States", x => x.StateID);
                });

            migrationBuilder.CreateTable(
                name: "UserGroups",
                columns: table => new
                {
                    UserGroupID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ListPermission = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValueSql: "('*')"),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    RegistrationDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    LastLoginDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    Id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserGrou__FA5A61E004416180", x => x.UserGroupID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Gender = table.Column<bool>(type: "bit", nullable: false),
                    ImageURL = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Users__1788CCAC48CA5854", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    CityID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CityName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    StateID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.CityID);
                    table.ForeignKey(
                        name: "FK_Cities_States",
                        column: x => x.StateID,
                        principalTable: "States",
                        principalColumn: "StateID");
                });

            migrationBuilder.CreateTable(
                name: "Attachments",
                columns: table => new
                {
                    AttachmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    Description = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    ContentType = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Size = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Tags = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Attachme__442C64DEF43770EC", x => x.AttachmentID);
                    table.ForeignKey(
                        name: "FK__Attachmen__Creat__3F3159AB",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Attachmen__Updat__40257DE4",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Brand",
                columns: table => new
                {
                    BrandID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrandName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ImageURL = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Brand__DAD4F3BE5835F902", x => x.BrandID);
                    table.ForeignKey(
                        name: "FK__Brand__CreatedBy__36D11DD4",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Brand__UpdatedBy__35DCF99B",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    CartID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Carts__51BCD797CEA5AF88", x => x.CartID);
                    table.ForeignKey(
                        name: "FK__Carts__UserID__7F4BDEC0",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Categori__19093A2B46C66ECE", x => x.CategoryID);
                    table.ForeignKey(
                        name: "FK__Categorie__Creat__51851410",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Categorie__Updat__5090EFD7",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Coupons",
                columns: table => new
                {
                    CouponID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CouponCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DiscountPercent = table.Column<int>(type: "int", nullable: true, defaultValueSql: "((0))"),
                    MaxUses = table.Column<int>(type: "int", nullable: true, defaultValueSql: "((0))"),
                    Uses = table.Column<int>(type: "int", nullable: true, defaultValueSql: "((0))"),
                    StartDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    AppliesToProducts = table.Column<bool>(type: "bit", nullable: false),
                    AppliesToCategories = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Coupons__384AF1DA122B4B32", x => x.CouponID);
                    table.ForeignKey(
                        name: "FK__Coupons__Created__789EE131",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Coupons__Updated__77AABCF8",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Ingredient",
                columns: table => new
                {
                    IngredientID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IngredientName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Ingredie__BEAEB27A7D7FA4BD", x => x.IngredientID);
                    table.ForeignKey(
                        name: "FK__Ingredien__Creat__4AD81681",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Ingredien__Updat__49E3F248",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "LanguageTranslations",
                columns: table => new
                {
                    LanguageTranslationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LanguageID = table.Column<int>(type: "int", nullable: false),
                    TranslationKey = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TranslationValue = table.Column<string>(type: "text", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Language__28DA87CD087AA4A1", x => x.LanguageTranslationID);
                    table.ForeignKey(
                        name: "FK__LanguageT__Creat__0BE6BFCF",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__LanguageT__Langu__0CDAE408",
                        column: x => x.LanguageID,
                        principalTable: "Languages",
                        principalColumn: "LanguageID");
                    table.ForeignKey(
                        name: "FK__LanguageT__Updat__0AF29B96",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "OrderStatuses",
                columns: table => new
                {
                    OrderStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderStatusName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    OrderStatusDescription = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__OrderSta__BC674F4182E369BA", x => x.OrderStatusID);
                    table.ForeignKey(
                        name: "FK__OrderStat__Creat__77DFC722",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__OrderStat__Updat__76EBA2E9",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "PaymentMethods",
                columns: table => new
                {
                    PaymentMethodID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Thumbnail = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PaymentMethodName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PaymentMethodDetails = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PaymentM__DC31C1F3691FB6F4", x => x.PaymentMethodID);
                    table.ForeignKey(
                        name: "FK__PaymentMe__Creat__7132C993",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__PaymentMe__Updat__703EA55A",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "RefundStatuses",
                columns: table => new
                {
                    RefundStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RefundStatusName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RefundStatusDescription = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__RefundSt__CFFDB048E1D099A1", x => x.RefundStatusID);
                    table.ForeignKey(
                        name: "FK__RefundSta__Creat__7E8CC4B1",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__RefundSta__Updat__7D98A078",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "ScentNote",
                columns: table => new
                {
                    ScentNoteID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScentNoteName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ScentNot__866807A1516DB2D5", x => x.ScentNoteID);
                    table.ForeignKey(
                        name: "FK__ScentNote__Creat__3D7E1B63",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__ScentNote__Updat__3C89F72A",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Size",
                columns: table => new
                {
                    SizeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SizeName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Size__83BD095A337F550F", x => x.SizeID);
                    table.ForeignKey(
                        name: "FK__Size__CreatedBy__442B18F2",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Size__UpdatedBy__4336F4B9",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "SupportCategories",
                columns: table => new
                {
                    CategoryID = table.Column<int>(type: "int", nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SupportC__19093A2BD4669AFD", x => x.CategoryID);
                    table.ForeignKey(
                        name: "FK__SupportCa__Creat__2FEF161B",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__SupportCa__Updat__2EFAF1E2",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "SupportTicketStatuses",
                columns: table => new
                {
                    SupportTicketStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SupportTicketStatusName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SupportTicketStatusDescription = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SupportT__2381ADD32BD34D2A", x => x.SupportTicketStatusID);
                    table.ForeignKey(
                        name: "FK__SupportTi__Creat__0539C240",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__SupportTi__Updat__04459E07",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "UserLogin",
                columns: table => new
                {
                    LoginID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: true),
                    UserGroupID = table.Column<int>(type: "int", nullable: true, defaultValueSql: "((2))"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PasswordResetToken = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PasswordResetTokenExpiry = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsEmailVerified = table.Column<bool>(type: "bit", nullable: false),
                    IsAccountVerified = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorSecretKey = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TwoFactorBackupCodes = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    FailedLoginAttempts = table.Column<int>(type: "int", nullable: false),
                    IsLockedOut = table.Column<bool>(type: "bit", nullable: false),
                    LastPasswordChangeDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    PasswordExpirationDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    PasswordHistory = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    IsPasswordExpired = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    RegistrationDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    LastLoginDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    Id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserLogi__4DDA2838463D6640", x => x.LoginID);
                    table.ForeignKey(
                        name: "FK__UserLogin__Creat__795DFB40",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__UserLogin__Updat__7869D707",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__UserLogin__UserG__7775B2CE",
                        column: x => x.UserGroupID,
                        principalTable: "UserGroups",
                        principalColumn: "UserGroupID");
                    table.ForeignKey(
                        name: "FK__UserLogin__UserI__7A521F79",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "WebsiteVisitors",
                columns: table => new
                {
                    VisitorID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IPAddress = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VisitDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    PageVisited = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__WebsiteV__B121AFA8E001BD90", x => x.VisitorID);
                    table.ForeignKey(
                        name: "FK__WebsiteVi__UserI__4E739D3B",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "UserAddresses",
                columns: table => new
                {
                    AddressID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    AddressLine1 = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    AddressLine2 = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CityID = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Country = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserAddr__091C2A1B3AA083C8", x => x.AddressID);
                    table.ForeignKey(
                        name: "FK__UserAddre__CityI__10AB74EC",
                        column: x => x.CityID,
                        principalTable: "Cities",
                        principalColumn: "CityID");
                    table.ForeignKey(
                        name: "FK__UserAddre__UserI__0FB750B3",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Subcategories",
                columns: table => new
                {
                    SubcategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubcategoryName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CategoryID = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Subcateg__9C4E707D95735403", x => x.SubcategoryID);
                    table.ForeignKey(
                        name: "FK__Subcatego__Categ__592635D8",
                        column: x => x.CategoryID,
                        principalTable: "Categories",
                        principalColumn: "CategoryID");
                    table.ForeignKey(
                        name: "FK__Subcatego__Creat__5832119F",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Subcatego__Updat__573DED66",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "SupportTickets",
                columns: table => new
                {
                    TicketID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    AdminID = table.Column<int>(type: "int", nullable: false),
                    CategoryID = table.Column<int>(type: "int", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1200)", maxLength: 1200, nullable: true),
                    SupportTicketStatusID = table.Column<int>(type: "int", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsTicketOpen = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SupportT__712CC627E58A9D9C", x => x.TicketID);
                    table.ForeignKey(
                        name: "FK_SupportTickets_Admins",
                        column: x => x.AdminID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK_SupportTickets_SupportCategories",
                        column: x => x.CategoryID,
                        principalTable: "SupportCategories",
                        principalColumn: "CategoryID");
                    table.ForeignKey(
                        name: "FK_SupportTickets_Users",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__SupportTi__Suppo__33BFA6FF",
                        column: x => x.SupportTicketStatusID,
                        principalTable: "SupportTicketStatuses",
                        principalColumn: "SupportTicketStatusID");
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CouponID = table.Column<int>(type: "int", nullable: true),
                    AddressID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    PaymentMethodID = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    TotalCost = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    OrderStatusID = table.Column<int>(type: "int", nullable: false),
                    TrackingNumber = table.Column<int>(type: "int", nullable: true),
                    ShippedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeliveredDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Orders__C3905BAF5531CA13", x => x.OrderID);
                    table.ForeignKey(
                        name: "FK__Orders__AddressI__08D548FA",
                        column: x => x.AddressID,
                        principalTable: "UserAddresses",
                        principalColumn: "AddressID");
                    table.ForeignKey(
                        name: "FK__Orders__CouponID__0BB1B5A5",
                        column: x => x.CouponID,
                        principalTable: "Coupons",
                        principalColumn: "CouponID");
                    table.ForeignKey(
                        name: "FK__Orders__OrderSta__0ABD916C",
                        column: x => x.OrderStatusID,
                        principalTable: "OrderStatuses",
                        principalColumn: "OrderStatusID");
                    table.ForeignKey(
                        name: "FK__Orders__PaymentM__09C96D33",
                        column: x => x.PaymentMethodID,
                        principalTable: "PaymentMethods",
                        principalColumn: "PaymentMethodID");
                    table.ForeignKey(
                        name: "FK__Orders__UserID__0CA5D9DE",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    SubcategoryID = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    BrandID = table.Column<int>(type: "int", nullable: false),
                    ScentNoteID = table.Column<int>(type: "int", nullable: false),
                    SizeID = table.Column<int>(type: "int", nullable: false),
                    ImageURL = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Products__B40CC6ED8E17D7BE", x => x.ProductID);
                    table.ForeignKey(
                        name: "FK__Products__BrandI__60C757A0",
                        column: x => x.BrandID,
                        principalTable: "Brand",
                        principalColumn: "BrandID");
                    table.ForeignKey(
                        name: "FK__Products__Create__5FD33367",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Products__ScentN__61BB7BD9",
                        column: x => x.ScentNoteID,
                        principalTable: "ScentNote",
                        principalColumn: "ScentNoteID");
                    table.ForeignKey(
                        name: "FK__Products__SizeID__62AFA012",
                        column: x => x.SizeID,
                        principalTable: "Size",
                        principalColumn: "SizeID");
                    table.ForeignKey(
                        name: "FK__Products__Subcat__63A3C44B",
                        column: x => x.SubcategoryID,
                        principalTable: "Subcategories",
                        principalColumn: "SubcategoryID");
                    table.ForeignKey(
                        name: "FK__Products__Update__5EDF0F2E",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "SupportMessages",
                columns: table => new
                {
                    MessageID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(1200)", maxLength: 1200, nullable: true),
                    Timestamp = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SupportM__C87C037CA77CC6D5", x => x.MessageID);
                    table.ForeignKey(
                        name: "FK_SupportMessages_SupportTickets",
                        column: x => x.TicketID,
                        principalTable: "SupportTickets",
                        principalColumn: "TicketID");
                    table.ForeignKey(
                        name: "FK_SupportMessages_Users",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Refunds",
                columns: table => new
                {
                    RefundID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderID = table.Column<int>(type: "int", nullable: false),
                    RefundAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    RefundDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    RefundStatusID = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Refunds__725AB9007E0832F7", x => x.RefundID);
                    table.ForeignKey(
                        name: "FK__Refunds__Created__190BB0C3",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Refunds__OrderID__19FFD4FC",
                        column: x => x.OrderID,
                        principalTable: "Orders",
                        principalColumn: "OrderID");
                    table.ForeignKey(
                        name: "FK__Refunds__RefundS__1AF3F935",
                        column: x => x.RefundStatusID,
                        principalTable: "RefundStatuses",
                        principalColumn: "RefundStatusID");
                    table.ForeignKey(
                        name: "FK__Refunds__Updated__18178C8A",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "CartItems",
                columns: table => new
                {
                    CartItemID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CartID = table.Column<int>(type: "int", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CartItem__488B0B2A3133811A", x => x.CartItemID);
                    table.ForeignKey(
                        name: "FK__CartItems__CartI__02284B6B",
                        column: x => x.CartID,
                        principalTable: "Carts",
                        principalColumn: "CartID");
                    table.ForeignKey(
                        name: "FK__CartItems__Produ__031C6FA4",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "ProductID");
                });

            migrationBuilder.CreateTable(
                name: "Inventory",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: true, defaultValueSql: "((0))"),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Inventor__B40CC6EDA66E2B10", x => x.ProductID);
                    table.ForeignKey(
                        name: "FK__Inventory__Creat__6C390A4C",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Inventory__Produ__6D2D2E85",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "ProductID");
                    table.ForeignKey(
                        name: "FK__Inventory__Updat__6B44E613",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    OrderItemID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderID = table.Column<int>(type: "int", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: true, defaultValueSql: "((0))"),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__OrderIte__57ED06A18CD78F49", x => x.OrderItemID);
                    table.ForeignKey(
                        name: "FK__OrderItem__Order__116A8EFB",
                        column: x => x.OrderID,
                        principalTable: "Orders",
                        principalColumn: "OrderID");
                    table.ForeignKey(
                        name: "FK__OrderItem__Produ__125EB334",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "ProductID");
                });

            migrationBuilder.CreateTable(
                name: "ProductAttachments",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    AttachmentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ProductA__404E00A02BCD1033", x => new { x.ProductID, x.AttachmentID });
                    table.ForeignKey(
                        name: "FK__ProductAt__Attac__43F60EC8",
                        column: x => x.AttachmentID,
                        principalTable: "Attachments",
                        principalColumn: "AttachmentID");
                    table.ForeignKey(
                        name: "FK__ProductAt__Produ__4301EA8F",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "ProductID");
                });

            migrationBuilder.CreateTable(
                name: "ProductIngredient",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    IngredientID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ProductI__0FE62DCA9773D289", x => new { x.ProductID, x.IngredientID });
                    table.ForeignKey(
                        name: "FK__ProductIn__Ingre__7C6F7215",
                        column: x => x.IngredientID,
                        principalTable: "Ingredient",
                        principalColumn: "IngredientID");
                    table.ForeignKey(
                        name: "FK__ProductIn__Produ__7B7B4DDC",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "ProductID");
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    ReviewID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<byte>(type: "tinyint", nullable: true, defaultValueSql: "((5))"),
                    Comment = table.Column<string>(type: "text", nullable: true),
                    IsApproved = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Reviews__74BC79AEC7DF1A33", x => x.ReviewID);
                    table.ForeignKey(
                        name: "FK_Reviews_Products",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "ProductID");
                    table.ForeignKey(
                        name: "FK_Reviews_Users",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    BlogID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Content = table.Column<string>(type: "text", nullable: true),
                    ReviewID = table.Column<int>(type: "int", nullable: false),
                    ImageURL = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Blogs__54379E503030D176", x => x.BlogID);
                    table.ForeignKey(
                        name: "FK_Blogs_Reviews",
                        column: x => x.ReviewID,
                        principalTable: "Reviews",
                        principalColumn: "ReviewID");
                    table.ForeignKey(
                        name: "FK__Blogs__CreatedBy__284DF453",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK__Blogs__UpdatedBy__2759D01A",
                        column: x => x.UpdatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "ReviewAttachments",
                columns: table => new
                {
                    ReviewID = table.Column<int>(type: "int", nullable: false),
                    AttachmentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ReviewAt__80FEBFE306DAD862", x => new { x.ReviewID, x.AttachmentID });
                    table.ForeignKey(
                        name: "FK__ReviewAtt__Attac__47C69FAC",
                        column: x => x.AttachmentID,
                        principalTable: "Attachments",
                        principalColumn: "AttachmentID");
                    table.ForeignKey(
                        name: "FK__ReviewAtt__Revie__46D27B73",
                        column: x => x.ReviewID,
                        principalTable: "Reviews",
                        principalColumn: "ReviewID");
                });

            migrationBuilder.CreateTable(
                name: "BlogAttachments",
                columns: table => new
                {
                    BlogID = table.Column<int>(type: "int", nullable: false),
                    AttachmentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__BlogAtta__A075581D30129C4A", x => new { x.BlogID, x.AttachmentID });
                    table.ForeignKey(
                        name: "FK__BlogAttac__Attac__4B973090",
                        column: x => x.AttachmentID,
                        principalTable: "Attachments",
                        principalColumn: "AttachmentID");
                    table.ForeignKey(
                        name: "FK__BlogAttac__BlogI__4AA30C57",
                        column: x => x.BlogID,
                        principalTable: "Blogs",
                        principalColumn: "BlogID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_CreatedBy",
                table: "Attachments",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_UpdatedBy",
                table: "Attachments",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "idx_BlogAttachments_BlogID",
                table: "BlogAttachments",
                column: "BlogID");

            migrationBuilder.CreateIndex(
                name: "IX_BlogAttachments_AttachmentID",
                table: "BlogAttachments",
                column: "AttachmentID");

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_CreatedBy",
                table: "Blogs",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_ReviewID",
                table: "Blogs",
                column: "ReviewID");

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_UpdatedBy",
                table: "Blogs",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Brand_CreatedBy",
                table: "Brand",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Brand_UpdatedBy",
                table: "Brand",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "idx_CartItems_CartID",
                table: "CartItems",
                column: "CartID");

            migrationBuilder.CreateIndex(
                name: "idx_CartItems_ProductID",
                table: "CartItems",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_UserID",
                table: "Carts",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_CreatedBy",
                table: "Categories",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_UpdatedBy",
                table: "Categories",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_StateID",
                table: "Cities",
                column: "StateID");

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_CreatedBy",
                table: "Coupons",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_UpdatedBy",
                table: "Coupons",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_CreatedBy",
                table: "Ingredient",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_UpdatedBy",
                table: "Ingredient",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_CreatedBy",
                table: "Inventory",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_UpdatedBy",
                table: "Inventory",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_LanguageTranslations_CreatedBy",
                table: "LanguageTranslations",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_LanguageTranslations_LanguageID",
                table: "LanguageTranslations",
                column: "LanguageID");

            migrationBuilder.CreateIndex(
                name: "IX_LanguageTranslations_UpdatedBy",
                table: "LanguageTranslations",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "idx_OrderItems_OrderID",
                table: "OrderItems",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "idx_OrderItems_ProductID",
                table: "OrderItems",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "idx_Orders_OrderStatusID",
                table: "Orders",
                column: "OrderStatusID");

            migrationBuilder.CreateIndex(
                name: "idx_Orders_UserID",
                table: "Orders",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AddressID",
                table: "Orders",
                column: "AddressID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CouponID",
                table: "Orders",
                column: "CouponID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PaymentMethodID",
                table: "Orders",
                column: "PaymentMethodID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderStatuses_CreatedBy",
                table: "OrderStatuses",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_OrderStatuses_UpdatedBy",
                table: "OrderStatuses",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethods_CreatedBy",
                table: "PaymentMethods",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethods_UpdatedBy",
                table: "PaymentMethods",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "idx_ProductAttachments_ProductID",
                table: "ProductAttachments",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_ProductAttachments_AttachmentID",
                table: "ProductAttachments",
                column: "AttachmentID");

            migrationBuilder.CreateIndex(
                name: "idx_ProductIngredient_IngredientID",
                table: "ProductIngredient",
                column: "IngredientID");

            migrationBuilder.CreateIndex(
                name: "idx_ProductIngredient_ProductID",
                table: "ProductIngredient",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_BrandID",
                table: "Products",
                column: "BrandID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CreatedBy",
                table: "Products",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ScentNoteID",
                table: "Products",
                column: "ScentNoteID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_SizeID",
                table: "Products",
                column: "SizeID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_SubcategoryID",
                table: "Products",
                column: "SubcategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_UpdatedBy",
                table: "Products",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_CreatedBy",
                table: "Refunds",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_OrderID",
                table: "Refunds",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_RefundStatusID",
                table: "Refunds",
                column: "RefundStatusID");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_UpdatedBy",
                table: "Refunds",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RefundStatuses_CreatedBy",
                table: "RefundStatuses",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RefundStatuses_UpdatedBy",
                table: "RefundStatuses",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "idx_ReviewAttachments_ReviewID",
                table: "ReviewAttachments",
                column: "ReviewID");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewAttachments_AttachmentID",
                table: "ReviewAttachments",
                column: "AttachmentID");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ProductID",
                table: "Reviews",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserID",
                table: "Reviews",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_ScentNote_CreatedBy",
                table: "ScentNote",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_ScentNote_UpdatedBy",
                table: "ScentNote",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Size_CreatedBy",
                table: "Size",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Size_UpdatedBy",
                table: "Size",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "UQ_States_State",
                table: "States",
                column: "StateName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subcategories_CategoryID",
                table: "Subcategories",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Subcategories_CreatedBy",
                table: "Subcategories",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Subcategories_UpdatedBy",
                table: "Subcategories",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCategories_CreatedBy",
                table: "SupportCategories",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCategories_UpdatedBy",
                table: "SupportCategories",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "idx_SupportMessages_TicketID",
                table: "SupportMessages",
                column: "TicketID");

            migrationBuilder.CreateIndex(
                name: "IX_SupportMessages_UserID",
                table: "SupportMessages",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "idx_SupportTickets_CategoryID",
                table: "SupportTickets",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "idx_SupportTickets_SupportTicketStatusID",
                table: "SupportTickets",
                column: "SupportTicketStatusID");

            migrationBuilder.CreateIndex(
                name: "idx_SupportTickets_UserID",
                table: "SupportTickets",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTickets_AdminID",
                table: "SupportTickets",
                column: "AdminID");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTicketStatuses_CreatedBy",
                table: "SupportTicketStatuses",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTicketStatuses_UpdatedBy",
                table: "SupportTicketStatuses",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "idx_UserAddresses_UserID",
                table: "UserAddresses",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_UserAddresses_CityID",
                table: "UserAddresses",
                column: "CityID");

            migrationBuilder.CreateIndex(
                name: "UQ__UserGrou__6EFCD434725CDDB1",
                table: "UserGroups",
                column: "GroupName",
                unique: true,
                filter: "[GroupName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogin_CreatedBy",
                table: "UserLogin",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogin_UpdatedBy",
                table: "UserLogin",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogin_UserGroupID",
                table: "UserLogin",
                column: "UserGroupID");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogin_UserID",
                table: "UserLogin",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "UQ__UserLogi__536C85E4E6094AF7",
                table: "UserLogin",
                column: "Username",
                unique: true,
                filter: "[Username] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UQ__UserLogi__5C7E359E8BC903F0",
                table: "UserLogin",
                column: "Phone",
                unique: true,
                filter: "[Phone] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UQ__UserLogi__A9D10534A5BCE241",
                table: "UserLogin",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WebsiteVisitors_UserID",
                table: "WebsiteVisitors",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogAttachments");

            migrationBuilder.DropTable(
                name: "CartItems");

            migrationBuilder.DropTable(
                name: "Inventory");

            migrationBuilder.DropTable(
                name: "LanguageTranslations");

            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "ProductAttachments");

            migrationBuilder.DropTable(
                name: "ProductIngredient");

            migrationBuilder.DropTable(
                name: "Refunds");

            migrationBuilder.DropTable(
                name: "ReviewAttachments");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "SMS");

            migrationBuilder.DropTable(
                name: "SupportMessages");

            migrationBuilder.DropTable(
                name: "UserLogin");

            migrationBuilder.DropTable(
                name: "WebsiteVisitors");

            migrationBuilder.DropTable(
                name: "Blogs");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Languages");

            migrationBuilder.DropTable(
                name: "Ingredient");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "RefundStatuses");

            migrationBuilder.DropTable(
                name: "Attachments");

            migrationBuilder.DropTable(
                name: "SupportTickets");

            migrationBuilder.DropTable(
                name: "UserGroups");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "UserAddresses");

            migrationBuilder.DropTable(
                name: "Coupons");

            migrationBuilder.DropTable(
                name: "OrderStatuses");

            migrationBuilder.DropTable(
                name: "PaymentMethods");

            migrationBuilder.DropTable(
                name: "SupportCategories");

            migrationBuilder.DropTable(
                name: "SupportTicketStatuses");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.DropTable(
                name: "Brand");

            migrationBuilder.DropTable(
                name: "ScentNote");

            migrationBuilder.DropTable(
                name: "Size");

            migrationBuilder.DropTable(
                name: "Subcategories");

            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
