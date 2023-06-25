﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Yani.Models.Database;

public partial class Ingredient
{
    [Key]
    [Column("IngredientID")]
    public int IngredientId { get; set; }

    [Required]
    [StringLength(50)]
    public string IngredientName { get; set; }

    public int CreatedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdateDate { get; set; }

    public int? UpdatedBy { get; set; }

    [ForeignKey("CreatedBy")]
    [InverseProperty("IngredientCreatedByNavigation")]
    public virtual Users CreatedByNavigation { get; set; }

    [InverseProperty("Ingredient")]
    public virtual ICollection<ProductIngredient> ProductIngredient { get; set; } = new List<ProductIngredient>();

    [ForeignKey("UpdatedBy")]
    [InverseProperty("IngredientUpdatedByNavigation")]
    public virtual Users UpdatedByNavigation { get; set; }
}