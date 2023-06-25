﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Yani.Models.Database;

[Index("GroupName", Name = "UQ__UserGrou__6EFCD4342D6319E2", IsUnique = true)]
public partial class UserGroups
{
    [Key]
    [Column("UserGroupID")]
    public int UserGroupId { get; set; }

    [StringLength(50)]
    public string GroupName { get; set; }

    [Required]
    public string ListPermission { get; set; }

    public int? CreatedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? RegistrationDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LastLoginDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdateDate { get; set; }

    [InverseProperty("UserGroup")]
    public virtual ICollection<UserLogin> UserLogin { get; set; } = new List<UserLogin>();
}