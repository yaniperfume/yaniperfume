﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Yani.Models.Database;

public partial class OrderStatuses
{
    [Key]
    [Column("OrderStatusID")]
    public int OrderStatusId { get; set; }

    [StringLength(50)]
    public string OrderStatusName { get; set; }

    [StringLength(255)]
    public string OrderStatusDescription { get; set; }

    public int CreatedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdateDate { get; set; }

    public int? UpdatedBy { get; set; }

    [ForeignKey("CreatedBy")]
    [InverseProperty("OrderStatusesCreatedByNavigation")]
    public virtual Users CreatedByNavigation { get; set; }

    [InverseProperty("OrderStatus")]
    public virtual ICollection<Orders> Orders { get; set; } = new List<Orders>();

    [ForeignKey("UpdatedBy")]
    [InverseProperty("OrderStatusesUpdatedByNavigation")]
    public virtual Users UpdatedByNavigation { get; set; }
}