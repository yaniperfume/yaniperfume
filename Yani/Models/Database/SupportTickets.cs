﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Yani.Models.Database;

[Index("CategoryId", Name = "idx_SupportTickets_CategoryID")]
[Index("SupportTicketStatusId", Name = "idx_SupportTickets_SupportTicketStatusID")]
[Index("UserId", Name = "idx_SupportTickets_UserID")]
public partial class SupportTickets
{
    [Key]
    [Column("TicketID")]
    public int TicketId { get; set; }

    [Column("UserID")]
    public int UserId { get; set; }

    [Column("AdminID")]
    public int AdminId { get; set; }

    [Column("CategoryID")]
    public int CategoryId { get; set; }

    [StringLength(255)]
    public string Subject { get; set; }

    [StringLength(1200)]
    public string Description { get; set; }

    [Column("SupportTicketStatusID")]
    public int SupportTicketStatusId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Timestamp { get; set; }

    [Required]
    public bool? IsTicketOpen { get; set; }

    [ForeignKey("AdminId")]
    [InverseProperty("SupportTicketsAdmin")]
    public virtual Users Admin { get; set; }

    [ForeignKey("CategoryId")]
    [InverseProperty("SupportTickets")]
    public virtual SupportCategories Category { get; set; }

    [InverseProperty("Ticket")]
    public virtual ICollection<SupportMessages> SupportMessages { get; set; } = new List<SupportMessages>();

    [ForeignKey("SupportTicketStatusId")]
    [InverseProperty("SupportTickets")]
    public virtual SupportTicketStatuses SupportTicketStatus { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("SupportTicketsUser")]
    public virtual Users User { get; set; }
}