﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Yani.Models.Database;

public partial class Size
{
    [Key]
    [Column("SizeID")]
    public int SizeId { get; set; }

    [Required]
    [StringLength(50)]
    public string SizeName { get; set; }

    public int CreatedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdateDate { get; set; }

    public int? UpdatedBy { get; set; }

    [ForeignKey("CreatedBy")]
    [InverseProperty("SizeCreatedByNavigation")]
    public virtual Users CreatedByNavigation { get; set; }

    [InverseProperty("Size")]
    public virtual ICollection<Products> Products { get; set; } = new List<Products>();

    [ForeignKey("UpdatedBy")]
    [InverseProperty("SizeUpdatedByNavigation")]
    public virtual Users UpdatedByNavigation { get; set; }
}