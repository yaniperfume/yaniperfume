﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Yani.Models.Database;

[PrimaryKey("ProductId", "IngredientId")]
[Index("IngredientId", Name = "idx_ProductIngredient_IngredientID")]
[Index("ProductId", Name = "idx_ProductIngredient_ProductID")]
public partial class ProductIngredient
{
    [Key]
    [Column("ProductID")]
    public int ProductId { get; set; }

    [Key]
    [Column("IngredientID")]
    public int IngredientId { get; set; }

    [ForeignKey("IngredientId")]
    [InverseProperty("ProductIngredient")]
    public virtual Ingredient Ingredient { get; set; }

    [ForeignKey("ProductId")]
    [InverseProperty("ProductIngredient")]
    public virtual Products Product { get; set; }
}