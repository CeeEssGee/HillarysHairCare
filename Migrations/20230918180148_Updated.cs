using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HillarysHairCare.Migrations
{
    public partial class Updated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isCancelled",
                table: "Appointments",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isCancelled",
                table: "Appointments");
        }
    }
}
