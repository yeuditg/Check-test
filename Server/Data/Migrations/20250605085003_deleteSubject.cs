using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class deleteSubject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Subjects_SubjectId",
                table: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Files_SubjectId",
                table: "Files");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Files_SubjectId",
                table: "Files",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Subjects_SubjectId",
                table: "Files",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
