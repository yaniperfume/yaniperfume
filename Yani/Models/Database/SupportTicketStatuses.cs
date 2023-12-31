﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Yani.Models.Database;

public partial class SupportTicketStatuses
{
    [Key]
    [Column("SupportTicketStatusID")]
    public int SupportTicketStatusId { get; set; }

    [StringLength(50)]
    public string SupportTicketStatusName { get; set; }

    [StringLength(255)]
    public string SupportTicketStatusDescription { get; set; }

    public int CreatedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdateDate { get; set; }

    public int? UpdatedBy { get; set; }

    [ForeignKey("CreatedBy")]
    [InverseProperty("SupportTicketStatusesCreatedByNavigation")]
    public virtual Users CreatedByNavigation { get; set; }

    [InverseProperty("SupportTicketStatus")]
    public virtual ICollection<SupportTickets> SupportTickets { get; set; } = new List<SupportTickets>();

    [ForeignKey("UpdatedBy")]
    [InverseProperty("SupportTicketStatusesUpdatedByNavigation")]
    public virtual Users UpdatedByNavigation { get; set; }
}