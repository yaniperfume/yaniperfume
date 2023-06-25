﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Yani.Models.Database;

public partial class Carts
{
    [Key]
    [Column("CartID")]
    public int CartId { get; set; }

    [Column("UserID")]
    public int UserId { get; set; }

    [InverseProperty("Cart")]
    public virtual ICollection<CartItems> CartItems { get; set; } = new List<CartItems>();

    [ForeignKey("UserId")]
    [InverseProperty("Carts")]
    public virtual Users User { get; set; }
}