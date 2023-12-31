﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Yani.Models.Database;

public partial class Users
{
    [Key]
    [Column("UserID")]
    public int UserId { get; set; }

    [Required]
    [StringLength(50)]
    public string FirstName { get; set; }

    [Required]
    [StringLength(50)]
    public string LastName { get; set; }

    public bool Gender { get; set; }

    [Column("ImageURL")]
    [StringLength(255)]
    public string ImageUrl { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdateDate { get; set; }

    public int? UpdatedBy { get; set; }

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Attachments> AttachmentsCreatedByNavigation { get; set; } = new List<Attachments>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Attachments> AttachmentsUpdatedByNavigation { get; set; } = new List<Attachments>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Blogs> BlogsCreatedByNavigation { get; set; } = new List<Blogs>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Blogs> BlogsUpdatedByNavigation { get; set; } = new List<Blogs>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Brand> BrandCreatedByNavigation { get; set; } = new List<Brand>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Brand> BrandUpdatedByNavigation { get; set; } = new List<Brand>();

    [InverseProperty("User")]
    public virtual ICollection<Carts> Carts { get; set; } = new List<Carts>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Categories> CategoriesCreatedByNavigation { get; set; } = new List<Categories>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Categories> CategoriesUpdatedByNavigation { get; set; } = new List<Categories>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Coupons> CouponsCreatedByNavigation { get; set; } = new List<Coupons>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Coupons> CouponsUpdatedByNavigation { get; set; } = new List<Coupons>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Ingredient> IngredientCreatedByNavigation { get; set; } = new List<Ingredient>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Ingredient> IngredientUpdatedByNavigation { get; set; } = new List<Ingredient>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Inventory> InventoryCreatedByNavigation { get; set; } = new List<Inventory>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Inventory> InventoryUpdatedByNavigation { get; set; } = new List<Inventory>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<LanguageTranslations> LanguageTranslationsCreatedByNavigation { get; set; } = new List<LanguageTranslations>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<LanguageTranslations> LanguageTranslationsUpdatedByNavigation { get; set; } = new List<LanguageTranslations>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<OrderStatuses> OrderStatusesCreatedByNavigation { get; set; } = new List<OrderStatuses>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<OrderStatuses> OrderStatusesUpdatedByNavigation { get; set; } = new List<OrderStatuses>();

    [InverseProperty("User")]
    public virtual ICollection<Orders> Orders { get; set; } = new List<Orders>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<PaymentMethods> PaymentMethodsCreatedByNavigation { get; set; } = new List<PaymentMethods>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<PaymentMethods> PaymentMethodsUpdatedByNavigation { get; set; } = new List<PaymentMethods>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Products> ProductsCreatedByNavigation { get; set; } = new List<Products>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Products> ProductsUpdatedByNavigation { get; set; } = new List<Products>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<RefundStatuses> RefundStatusesCreatedByNavigation { get; set; } = new List<RefundStatuses>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<RefundStatuses> RefundStatusesUpdatedByNavigation { get; set; } = new List<RefundStatuses>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Refunds> RefundsCreatedByNavigation { get; set; } = new List<Refunds>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Refunds> RefundsUpdatedByNavigation { get; set; } = new List<Refunds>();

    [InverseProperty("User")]
    public virtual ICollection<Reviews> Reviews { get; set; } = new List<Reviews>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<ScentNote> ScentNoteCreatedByNavigation { get; set; } = new List<ScentNote>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<ScentNote> ScentNoteUpdatedByNavigation { get; set; } = new List<ScentNote>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Size> SizeCreatedByNavigation { get; set; } = new List<Size>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Size> SizeUpdatedByNavigation { get; set; } = new List<Size>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Subcategories> SubcategoriesCreatedByNavigation { get; set; } = new List<Subcategories>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Subcategories> SubcategoriesUpdatedByNavigation { get; set; } = new List<Subcategories>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<SupportCategories> SupportCategoriesCreatedByNavigation { get; set; } = new List<SupportCategories>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<SupportCategories> SupportCategoriesUpdatedByNavigation { get; set; } = new List<SupportCategories>();

    [InverseProperty("User")]
    public virtual ICollection<SupportMessages> SupportMessages { get; set; } = new List<SupportMessages>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<SupportTicketStatuses> SupportTicketStatusesCreatedByNavigation { get; set; } = new List<SupportTicketStatuses>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<SupportTicketStatuses> SupportTicketStatusesUpdatedByNavigation { get; set; } = new List<SupportTicketStatuses>();

    [InverseProperty("Admin")]
    public virtual ICollection<SupportTickets> SupportTicketsAdmin { get; set; } = new List<SupportTickets>();

    [InverseProperty("User")]
    public virtual ICollection<SupportTickets> SupportTicketsUser { get; set; } = new List<SupportTickets>();

    [InverseProperty("User")]
    public virtual ICollection<UserAddresses> UserAddresses { get; set; } = new List<UserAddresses>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<UserLogin> UserLoginCreatedByNavigation { get; set; } = new List<UserLogin>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<UserLogin> UserLoginUpdatedByNavigation { get; set; } = new List<UserLogin>();

    [InverseProperty("User")]
    public virtual ICollection<UserLogin> UserLoginUser { get; set; } = new List<UserLogin>();

    [InverseProperty("User")]
    public virtual ICollection<WebsiteVisitors> WebsiteVisitors { get; set; } = new List<WebsiteVisitors>();
}